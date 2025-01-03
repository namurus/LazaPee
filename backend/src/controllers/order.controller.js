import db from '@/database';

//controller add product to checkout (fetching all product details)
export const addProductToOrderCheckout = async (req, res, next) => {
  try {
      const { selectItems } = req.body;

      // Validate input
      if (!selectItems || !selectItems.length) {
          return res.status(400).json({ message: 'Incomplete information or cart is empty!' });
      }

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


export const createOrders = async (req, res, next) => {
  try {
    const { shippingAddress, shippingCompany, phoneNumber, paymentMethod, shippingFee, selectItems, voucherId } = req.body;

     // Fetch user's cart
     const cart = await db.models.Cart.findOne({
      where: { userId: req.user.id },
      include: {
        model: db.models.CartItem,
        as: 'cartItems',
      },
    });

    if (!cart || !cart.cartItems.length) {
      return res.status(400).json({ message: 'Your cart is empty!' });
    }
    
    // Map items by shopId
    const shopOrders = {};
    const itemsToRemove = [];
    
    for (const item of selectItems) {
      const sku = await db.models.Skus.findOne({ where: { id: item.skusId } });

      if (!sku) {
        return res.status(404).json({ message: `SKU with ID ${item.skusId} not found` });
      }

      if (sku.stock_quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for SKU ${item.skusId}` });
      }

      const product = await db.models.Product.findOne({ where: { id: sku.productId } });
      if (!shopOrders[product.shopId]) {
        shopOrders[product.shopId] = [];
      }

      // Deduct stock quantity
      sku.stock_quantity -= item.quantity;
      await sku.save(); 

      shopOrders[product.shopId].push({ sku, quantity: item.quantity, price: sku.price });

      // Find cart item and mark it for removal
      const productIncartItem = cart.cartItems.find((ci) => ci.skusId === item.skusId);
      if (productIncartItem) {
        itemsToRemove.push(productIncartItem.id);
      }
    }

    const createdOrders = [];
    for (const [shopId, items] of Object.entries(shopOrders)) {
      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // // Apply voucher if provided
      // let discount = 0;
      // if (voucherId) {
      //   const voucher = await db.models.Voucher.findOne({ where: { id: voucherId, status: true } });
      //   if (voucher) {
      //     discount = (totalAmount * voucher.discount) / 100;
      //     voucher.quantity -= 1;
      //     if (voucher.quantity <= 0) voucher.status = false;
      //     await voucher.save();
      //   }
      // }

      const order = await db.models.Order.create({
        customerId: req.user.id,
        shopId: parseInt(shopId),
        shippingAddress,
        shippingCompany,
        phoneNumber,
        paymentMethod,
        shippingFee,
        totalAmount: totalAmount,
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
    // Remove purchased items from the cart
    await db.models.CartItem.destroy({
      where: {
        id: itemsToRemove,
      },
    });

    res.status(201).json({ message: 'Orders created successfully', orders: createdOrders });
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
  const { status, shippingAddress, paymentMethod, phoneNumber} = req.body;

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
  const { id } = req.params;

  try {
    // Validate if userId is provided
    if (!id) {
      return res.status(400).json({ message: 'Customer ID is required.' });
    }

    // Fetch all orders for the given userId
    const orders = await db.models.Order.findAll({
      where: { customerId: id },
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




