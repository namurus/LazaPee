import db from '@/database';
import { Op } from 'sequelize';

export const getRevenue = async (req, res) => {
    try {
        const { startDate, endDate, shopId } = req.params;

        // Lấy tất cả đơn hàng trong khoảng thời gian
        const orders = await db.orders.findAll({
            where: {
                status: 'completed',
                shop_id: shopId, // Hoặc lấy từ token nếu cần
                created_at: {
                    [Op.gte]: new Date(startDate),
                    [Op.lte]: new Date(endDate),
                },
            },
            attributes: ['created_at', 'total_amount'], // Chỉ lấy các trường cần thiết
        });

        // Nhóm doanh thu theo ngày
        const revenueByDate = orders.reduce((acc, order) => {
            const date = new Date(order.created_at).toISOString().split('T')[0]; // Format YYYY-MM-DD
            if (!acc[date]) acc[date] = 0;
            acc[date] += order.total_amount;
            return acc;
        }, {});

        // Chuyển đổi dữ liệu thành mảng để frontend dễ xử lý
        const revenueStatistic = Object.entries(revenueByDate).map(([date, total]) => ({
            date,
            total,
        }));

        // Tổng doanh thu, số đơn hàng, doanh thu trung bình
        const totalRevenue = orders.reduce((total, order) => total + order.total_amount, 0);
        const numberOfOrders = orders.length;
        const revenuePerOrder = numberOfOrders > 0 ? totalRevenue / numberOfOrders : 0;

        
        const soldProducts = await db.orderItems.findAll({
            where: {
                orderId: {
                    [Op.in]: orders.map((order) => order.id),
                },
                attributes: ['price', 'quantity'],
                include: [
                    {
                        model: db.models.Skus,
                        as: 'sku', // Alias for the relation
                        group: ['product_id'], // Group by product_id
                        include: [
                            {
                                model: db.models.Product,
                                as: 'product',
                                attributes: ['name', 'thumbnail'],
                            }
                        ]
                    }
                ]
            },
        });
        
        // Gửi dữ liệu cho frontend
        res.status(200).json({
            totalRevenue,
            numberOfOrders,
            revenuePerOrder,
            revenueStatistic,
            soldProducts
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
