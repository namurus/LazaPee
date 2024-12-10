import db from '@/database';

export const checkout = async (req, res, next) => {
    try {
        const { userId, address, paymentMethod, cartItems } = req.body;

        // Validate input
        if (!userId || !address || !paymentMethod || !cartItems || !cartItems.length) {
            return res.status(400).json({ message: 'Incomplete information or cart is empty!' });
        }

        // Store created orders and order items for the response
        const orders = [];

        // Loop through each cart item and create a separate order
        for (const item of cartItems) {
            console.log('Searching for product with ID:', item.productId);
            const product = await db.models.Product.findByPk(item.productId);

            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} does not exist!` });
                
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Product with ID ${item.productId} is out of stock!` });
            }

            // Create a new order for the product
            const newOrder = await db.models.Order.create({
                userId,
                status: 'Pending',
            });

            // Create the order item for the product
            const orderItem = await db.models.OrderItem.create({
                orderId: newOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
            });

            // Add the order and its item to the response data
            orders.push({
                order: newOrder,
                orderItem,
            });
        }

        return res.status(201).json({
            message: 'Orders placed successfully!',
            orders,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        next(error); // Pass error to the error handling middleware
    }
};
