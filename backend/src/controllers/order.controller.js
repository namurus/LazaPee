import db from '@/database';

//controller add product to checkout (fetching all product details)
export const addProductToOrderCheckout = async (req, res, next) => {
  try {
      const { selectItems } = req.body;

      // Validate input
      if (!selectItems || !selectItems.length) {
          return res.status(400).json({ message: 'Incomplete information or cart is empty!'});
      }

      // Lấy giỏ hàng của người dùng
      const cart = await db.models.Cart.findOne({
      where: { userId: req.user.id },
      include: {
          model: db.models.CartItem,
          as: 'cartItems',
          attributes: ['skusId', 'quantity'],
      },
    });

    if (!cart || !cart.cartItems.length) {
        return res.status(400).json({ message: 'Your cart is empty!' });
    }

    const cartItemsMap = new Map(cart.cartItems.map(item => [item.skusId, item.quantity]));


      const skusDetails = [];
      let totalAmount = 0;

      for (const item of selectItems) {
          // Query SKU details with relations (Product, Shop, Attribute)
          const sku = await db.models.Skus.findByPk(item.skusId, {
              attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
              include: [
                  {
                      model: db.models.Product,
                      as: 'product',
                      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                      include: [
                          {
                              model: db.models.Shop,
                              as: 'shop',
                              attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                          },
                          {
                            model: db.models.ProductImage,
                            as: 'images',
                            attributes: ['id', 'url'],
                          },
                      ],
                  },                 
              ],
          });

          // Check if the SKU exists
          if (!sku) {
              skusDetails.push({ skusId: item.skusId, message: `SKU with ID ${item.skusId} does not exist!` });
              continue;
          }

          const skuData = sku.toJSON();

          // Check if the shop exists and is active
          if (!skuData.product?.shop) {
              skusDetails.push({ skusId: item.skusId, message: `Shop for SKU ID ${item.skusId} does not exist!` });
              continue;
          }

          if (skuData.product.shop.status === 'off') {
              skusDetails.push({ skusId: item.skusId, message: `Shop for SKU ID ${item.skusId} is currently off.` });
              continue;
          }

          // Check if the requested quantity exceeds available stock
          if (skuData.stock_quantity < item.quantity) {
              skusDetails.push({ skusId: item.skusId, message: `SKU with ID ${item.skusId} does not have enough stock!` });
              continue;
          }

          // Calculate the amount for this product
          const productAmount = item.quantity * skuData.price;
          totalAmount += productAmount;

          // Add SKU details to the result
          skusDetails.push({
              ...skuData,
              quantity: item.quantity,
              amount: productAmount,
          });
      }

      return res.status(200).json({
          skusDetails,
          totalAmount,
      });
  } catch (error) {
      console.error('Error retrieving product details:', error);
      next(error);
  }
};

export const getCartItemAndUserInfo = async (req, res, next) => {
  try {

      const { voucherCode } = req.body; // Lấy mã voucher từ request body

      const cart = await db.models.Cart.findOne({
          where: { userId: req.user.id },
          attributes: ['id'],
          include: [
              {
                  model: db.models.CartItem,
                  as: 'cartItems',
                  attributes: ['quantity'],
                  include: [
                      {
                          model: db.models.Skus,
                          as: 'skus',
                          attributes: ['price', 'color', 'size', 'stock_quantity'],
                          include: [
                              {
                                  model: db.models.Product,
                                  as: 'product',
                                  attributes: ['id', 'productName', 'brand', 'description', 'thumbnail'],
                                  include: [
                                      {
                                          model: db.models.Shop,
                                          as: 'shop',
                                          attributes: ['shopName', 'status'],
                                      },
                                  ],
                              },
                          ],
                      },
                  ],
              },
          ],
      });

        // Xử lý giỏ hàng không tồn tại hoặc trống
    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      console.log('Your cart is empty!');
      return res.status(400).json({ message: 'Your cart is empty!' });
    }

      const user = await db.models.User.findOne({
          where: {id: req.user.id },
          attributes: ['fullName', 'phone', 'address'],
          include: [
              {
                  model: db.models.UserAddress,
                  as: 'user_addresses',
                  attributes: ['fullName', 'phone', 'address'],
              },
          ],
      });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }


      // Lấy thông tin voucher
      let voucher = null;
      if (voucherCode) {
          voucher = await db.models.Voucher.findOne({
              where: { code: voucherCode },
          });

          if (!voucher) {
              return res.status(404).json({ message: 'Voucher not found or invalid' });
          }

          // Kiểm tra hạn sử dụng của voucher
          const now = new Date();
          if (now < voucher.startDate || now > voucher.endDate) {
            return res.status(400).json({ code: 400, message: 'Voucher is not available yet' });
          }

          if (voucher.status === false || voucher.quantity === 0) {
            return res.status(400).json({ code: 400, message: 'Voucher is not available' });
          }
          const userVoucher = await db.models.UserVoucher.findOne({
            where: { userId: user.id, voucherId: voucher.id },
          });
          if (userVoucher) {
            return res.status(400).json({ code: 400, message: 'Voucher has been used' });
          }
      }

      const result = {
          id: cart.id,
          products: await Promise.all(cart.cartItems.map(async (cartItem) => {
              const { product, price, attributeName, stock_quantity, value } = cartItem.skus;
              const shop = product.shop;

              return {
                  id: product.id,
                  productName: product.productName,
                  price,
                  attributeName,
                  stock_quantity,
                  value,
                  description: product.description,
                  brand: product.brand,
                  thumbnail: product.thumbnail,
                  quantity: cartItem.quantity,
                  outOfStock: stock_quantity < cartItem.quantity ? 'yes' : 'no',
                  shopOff: shop.status === 'off' ? 'yes' : 'no',
                  shopName: shop.shopName,
                  total: await cartItem.getTotal(),
              };
          })),
          total: await cart.getTotal(),
          userId: req.user.id,
          totalProducts: await cart.getTotalProducts(),
          discountPercentage: voucher.discount,
          userInfo: {
              fullName: user.fullName,
              phone: user.phone,
              address: user.address,
              secondaryInfo: user.user_addresses.map((address) => ({
                secondaryFullName: address.fullName,
                secondaryPhone: address.phone,
                secondaryAddress: address.address,
              })),
          },
      };

      res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal server error'});
  }
};



export const createOrders = async (req, res, next) => {
  try {
    const { fullName, phoneNumber, shippingAddress, shippingType,  paymentMethod, voucherCode} = req.body;


    // Fetch user's cart and related items
    const cart = await db.models.Cart.findOne({
      where: { userId: req.user.id },
      include: {
        model: db.models.CartItem,
        as: 'cartItems',
        include: [
          {
            model: db.models.Skus,
            as: 'skus',
            // attributes: ['i'productId', 'price', 'color', 'size', 'stock_quantity'],
          },
        ],
      },  

    });

    if (!cart || !cart.cartItems.length) {
      return res.status(400).json({ message: 'Your cart is empty!' });
    }
    

      // Check if voucher exists and is valid
      let voucher = null;
      if (voucherCode) {
        voucher = await db.models.Voucher.findOne({
          where: { code: voucherCode },
        });
      }

    // Determine shipping fee
    const shippingFee = shippingType === 'express' ? 40000 : 20000;

    // Organize cart items by shopId
    const shopOrders = {};
    
    for (let cartItem of cart.cartItems) {
      const sku = cartItem.skus;

      const product = await db.models.Product.findOne({ where: { id: sku.productId } });

      if (!shopOrders[product.shopId]) {
        shopOrders[product.shopId] = [];
      }

      // Deduct stock quantity
      sku.stock_quantity -= cartItem.quantity;
      await sku.save();

      shopOrders[product.shopId].push({
        sku,
        quantity: cartItem.quantity,
        price: sku.price,
      });
    }

    const createdOrders = [];
    for (const [shopId, items] of Object.entries(shopOrders)) {
      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const order = await db.models.Order.create({
        customerId: req.user.id,
        shopId: parseInt(shopId),
        status: 'pending',
        fullName,
        phoneNumber,
        shippingAddress,
        shippingType,
        paymentMethod: paymentMethod,
        totalAmount: totalAmount - (voucher ? totalAmount * voucher.discount / 100 : 0) + shippingFee,
        shippingFee: shippingFee,
      });

      for (const { sku, quantity } of items) {
        await db.models.OrderItem.create({
          orderId: order.id,
          skusId: sku.id,
          quantity,
          price: sku.price,
        });
      }

      createdOrders.push(order);
    }

  // Handle payment method after creating all orders
  if (paymentMethod === 'credit card') {
    // Generate payment and QR code for credit card
    const bankInfo = {
      id: process.env.BANK_ID,
      accountNo: process.env.ACCOUNT_NO,
      accountName: process.env.ACCOUNT_NAME,
      template: process.env.TEMPLATE,
    };

    const totalAmount = createdOrders.reduce((sum, order) => sum + order.totalAmount, 0); // Calculate total for all orders
    const orderIds = createdOrders.map((o) => o.id).join(',')

    const newPayment = await db.models.Payment.create({
      orderId: orderIds,
      customerId: req.user.id,
      amount: totalAmount,
      paymentMethod,
      description: 'Temporary description', // Temporary placeholder
      shipingCompany: 'Temporary shipping company', // Temporary placeholder
      shippingFee
    });

    // Update payment description
    await newPayment.update({
      description: `Orders-${createdOrders.map((o) => o.id)}-Pays-${newPayment.id}`,
    });

    // Generate QR code data
    const qrCodeData = `https://img.vietqr.io/image/${bankInfo.id}-${bankInfo.accountNo}-${bankInfo.template}.png?amount=${totalAmount}&addInfo=${encodeURIComponent(
      newPayment.description
    )}&accountName=${bankInfo.accountName}&paymentId=${newPayment.id}`;

    return res.status(201).json({
      message: 'Order successful please pay',
      qrCode: qrCodeData,
      paymentId: newPayment.id,
      orderIds: orderIds,
      orders: createdOrders,
    });
  } else if (paymentMethod === 'COD') {

    await db.models.CartItem.destroy({
      where: {
        cartId: cart.id,
      },
    });

    return res.status(201).json({
      message: 'Orders created successfully',
      orders: createdOrders,
    });
  }
} catch (error) {
  console.error('Error creating orders:', error);
  next(error);
}
};



// Controller to get order details by ID
export const getOrderDetailsById = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Validate that the order ID is provided
    if (!id) {
      return res.status(400).json({ message: 'Order ID is required.' });
    }

    // Find the order by its ID and include related information
    const order = await db.models.Order.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      include: [
        {
          model: db.models.OrderItem,
          as: 'OrderItems',
          attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
          include: [
            {
              model: db.models.Skus,
              as: 'sku', // Alias for the relation
              attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
              include: [
                {
                  model: db.models.Product,
                  as: 'product',
                  attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                  include: [
                    {
                      model: db.models.Shop,
                      as: 'shop',
                      attributes: ['shop_id', 'shopName', 'status'],
                    },
                    {
                      model: db.models.ProductImage,
                      as: 'images',
                      attributes: ['id', 'url'],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: db.models.User,
          as: 'customer',
          attributes: ['id', 'fullName', 'email', 'phone'], // Adjust attributes as needed
        },
      ],
    });

    // Check if order exists
    if (!order) {
      return res.status(404).json({ message: `Order with ID ${id} not found.` });
    }

    return res.status(200).json({ order });
  } catch (error) {
    console.error('Error retrieving order details:', error);
    next(error);
  }
};

// Controller to update an order by ID
export const updateOrderByID = async (req, res, next) => {
  const { id } = req.params;
  const { status, shippingAddress, paymentMethod, phoneNumber, shipingCompany} = req.body;

  try {
    // Validate if the order ID is missing
    if (!id) {
      return res.status(400).json({ message: 'Order ID is required.' });
    }

    // Find the order by its ID
    const order = await db.models.Order.findByPk(id);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: `Order with ID ${id} not found.` });
    }

    // Update the order fields if they are provided in the request body
    await order.update({
      ...(status && { status }),
      ...(shippingAddress && { shippingAddress }),
      ...(paymentMethod && { paymentMethod }),
      ...(phoneNumber && { phoneNumber }),
      ...(paymentMethod && { paymentMethod }),
      ...(shipingCompany && { shipingCompany }),
    });

    // Fetch the updated order details, including associated items and product data
     const updatedOrder = await db.models.Order.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      include: [
        {
          model: db.models.OrderItem,
          as: 'OrderItems',
          attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
          include: [
            {
              model: db.models.Skus,
              as: 'sku', // Alias for the relation
              attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
              include: [
                {
                  model: db.models.Product,
                  as: 'product',
                  attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                  include: [
                    {
                      model: db.models.Shop,
                      as: 'shop',
                      attributes: ['shop_id', 'shopName', 'status'],
                    },
                    {
                      model: db.models.ProductImage,
                      as: 'images',
                      attributes: ['id', 'url'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      message: 'Order updated successfully.',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order:', error);
    next(error); 
  }
};

// Controller to delete an order by ID
export const cancelledOrderByID = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Validate if the order ID is missing
    if (!id) {
      return res.status(400).json({ message: 'Order ID is required.' });
    }

    // Find the order by its ID
    const order = await db.models.Order.findByPk(id);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: `Order with ID ${id} not found.` });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({
        message: `Order with ID ${id} cannot be cancelled because it is ${order.status}.`,
      });
    }

      //Update status order
    await db.models.Order.update({
      status: 'cancelled',
    }, {
      where: { id: id },
    });

    // Delete the order
    await db.models.Order.destroy({
      where: { id: id },
   });

    return res.status(200).json({
      message: `Order with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    next(error); // Pass the error to the error-handling middleware
  }
};

// Controller to retrieve all orders for a specific user
export const getUserOrders = async (req, res, next) => {
  const  id  = req.user.id;

  try {
    // Validate if userId is provided
    if (!id) {
      return res.status(400).json({ message: 'Customer ID is required.' });
    }

    // Fetch all orders for the given userId
    const orders = await db.models.Order.findAll({
      where: { customerId: id },
      attributes: { exclude: ['updatedAt', 'deletedAt'] },
      include: [
        {
          model: db.models.OrderItem,
          as: 'OrderItems',
          attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
          include: [
            {
              model: db.models.Skus,
              as: 'sku', // Alias for the relation
              attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
              include: [
                {
                  model: db.models.Product,
                  as: 'product',
                  attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                  include: [
                    {
                      model: db.models.Shop,
                      as: 'shop',
                      attributes: ['shop_id', 'shopName', 'status'],
                    },
                    {
                      model: db.models.ProductImage,
                      as: 'images',
                      attributes: ['id', 'url'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      paranoid: false,
      order: [['createdAt', 'DESC']],
    });

    // Check if no orders are found for the user
    if (!orders.length) {
      return res.status(404).json({ message: `No orders found for user with ID ${id}.` });
    }

    // Return the list of orders
    return res.status(200).json({
      message: 'User orders retrieved successfully.',
      orders,
    });
  } catch (error) {
    console.error('Error retrieving user orders:', error);
    next(error); // Pass error to the error-handling middleware
  }
};




