import db from '@/database';

//controller checkoutn (fetching product details)
export const addProductToOrderCheckout = async (req, res, next) => {
    try {
        const { cartItems } = req.body;
        
        // Validate input
        // Check if cartItems exists and contains at least one item
        if (!cartItems || !cartItems.length) {
            return res.status(400).json({ message: 'Incomplete information or cart is empty!' });
        }

        const productDetails = [];

        // Loop through each cart item and fetch product details
        for (const item of cartItems) {
            // Query product details along with associated product images
            const product = await db.models.Product.findByPk(item.productId, {
                include: [
                    {
                        model: db.models.ProductImage,
                        as: 'images',
                        attributes: ['id', 'url'],
                    },
                ],
            });

            // Check if the product exists
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} does not exist!` });
            }

            // Check if the requested quantity exceeds available stock
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Product with ID ${item.productId} is out of stock!` });
            }

            const productData = product.toJSON();

            // Add product details to the result, including quantity and stock remaining
            productDetails.push({
                ...productData, 
                quantity: item.quantity,
                stockRemaining: product.stock - item.quantity,
            });
        }

        return res.status(200).json({
            message: 'Products retrieved successfully!',
            products: productDetails,
        });
    } catch (error) {

        console.error('Error retrieving product details:', error);
        next(error);
    }
};

// Controller for creating an orders
export const createOrders = async (req, res) => {
  const {paymentMethod, shippingAddress, shippingCompany, cartItems } = req.body;

  try {
    // Validate input
    if (!paymentMethod || !shippingAddress || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'Invalid input. Please provide all required information.' });
    }

    const createdOrders = [];

    for (const item of cartItems) {
      const product = await db.models.Product.findByPk(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found.` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Product with ID ${item.productId} is out of stock.` });
      }

      // Create order
      const order = await db.models.Order.create({
        userId: req.user.id,
        paymentMethod,
        shippingAddress,
        shippingCompany,
        status: 'pending',
      });

      // Create order item
      await db.models.OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price * item.quantity,
      });

      // Update product stock
      await product.update({
        stock: product.stock - item.quantity,
      });

      // Add order to response
      createdOrders.push({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        totalprice: product.price * item.quantity,
        status: order.status,
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod,
        shippingCompany: order.shippingCompany,
      });
    }

    return res.status(201).json({
      message: 'Orders created successfully.',
      orders: createdOrders,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

