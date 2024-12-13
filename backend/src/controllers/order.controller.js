import db from '@/database';

export const checkout = async (req, res, next) => {
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
            console.log('Searching for product with ID:', item.productId);

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
