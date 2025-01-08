import db from '@/database';
import { Op } from 'sequelize';

export const getRevenue = async (req, res) => {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const shopId = req.query.shopId; 
        console.log(startDate, endDate, shopId);
        // Lấy tất cả đơn hàng trong khoảng thời gian
        const orders = await db.models.Order.findAll({
            where: {
                status: 'completed',
                shop_id: shopId, // Hoặc lấy từ token nếu cần
                created_at: {
                    [Op.gte]: new Date(startDate),
                    [Op.lte]: new Date(endDate),
                },
            },
            attributes: ['id', 'created_at', 'total_amount'], // Chỉ lấy các trường cần thiết
        });

        // Tổng doanh thu, số đơn hàng, doanh thu trung bình
        let totalRevenue = 0;
        const orders_array = JSON.parse(JSON.stringify(orders));
        for(const order of orders_array) {
            totalRevenue += order.total_amount;
        }
        const numberOfOrders = orders.length;
        const revenuePerOrder = numberOfOrders > 0 ? totalRevenue / numberOfOrders : 0;

        
        const soldProducts = await db.models.OrderItem.findAll({
            where: {
                orderId: {
                    [Op.in]: orders.map((order) => order.id),
                },
            },
            attributes: ['price', 'quantity'],
            include: [
                {
                    model: db.models.Skus,
                    as: 'sku', // Alias for the relation
                    attributes: ['productId'],
                    include: [
                        {
                            model: db.models.Product,
                            as: 'product',
                            attributes: ['productName', 'thumbnail'], // Lấy thêm thông tin từ Product
                        }
                    ]
                }
            ]
        });

        const productStats = {};

        soldProducts.forEach((item) => {
            const productId = item.sku.productId;
            const product = item.sku.product;
            const revenue = item.price * item.quantity;
            const quantity = item.quantity;

            if (!productStats[productId]) {
                productStats[productId] = {
                    productId,
                    productName: product.productName,
                    thumbnail: product.thumbnail,
                    totalRevenue: 0,
                    totalSell: 0
                };
            }

            productStats[productId].totalRevenue += revenue;
            productStats[productId].totalSell += quantity;
        });

        const bestSellProduct = Object.values(productStats);

        
        
        // Gửi dữ liệu cho frontend
        res.status(200).json({
            totalRevenue,
            numberOfOrders,
            revenuePerOrder,
            bestSellProduct
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
