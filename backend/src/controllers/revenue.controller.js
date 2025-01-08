import db from '@/database';
import { Op } from 'sequelize';
import moment from 'moment';

export const getRevenue = async (req, res) => {
    try {
        const { startDate, endDate, shopId } = req.query;
        // shopId lấy từ token, hiện tại lấy từ query để kiểm định
        // Lấy tất cả đơn hàng trong khoảng thời gian
        const orders = await db.models.Order.findAll({
            where: {
                status: 'completed',
                shop_id: shopId,
                created_at: {
                    [Op.gte]: new Date(startDate),
                    [Op.lte]: new Date(endDate),
                },
            },
            attributes: ['id', 'created_at', 'total_amount'],
        });

        // Tổng doanh thu, số đơn hàng, doanh thu trung bình
        let totalRevenue = 0;
        const orders_array = JSON.parse(JSON.stringify(orders));
        for (const order of orders_array) {
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
                    as: 'sku',
                    attributes: ['productId'],
                    include: [
                        {
                            model: db.models.Product,
                            as: 'product',
                            attributes: ['productName', 'thumbnail'],
                        },
                    ],
                },
            ],
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
                    totalSell: 0,
                };
            }

            productStats[productId].totalRevenue += revenue;
            productStats[productId].totalSell += quantity;
        });

        const bestSellProduct = Object.values(productStats);

        // Chức năng chia khoảng thời gian thành 20 đoạn
        const start = moment(startDate);
        const end = moment(endDate);
        const duration = end.diff(start, 'days') + 1;
        const interval = Math.ceil(duration / 20);

        const revenueData = [];
        for (let i = 0; i < 20; i++) {
            const segmentStart = moment(start).add(i * interval, 'days');
            const segmentEnd = moment(start).add((i + 1) * interval - 1, 'days');

            if (segmentStart.isAfter(end)) break;

            const segmentOrders = orders_array.filter((order) => {
                const orderDate = moment(order.created_at);
                return orderDate.isBetween(segmentStart, segmentEnd, 'days', '[]');
            });

            const segmentRevenue = segmentOrders.reduce(
                (total, order) => total + order.total_amount,
                0
            );

            revenueData.push({
                Revenue: segmentRevenue,
                Date: `${segmentStart.format('YYYY-MM-DD')} - ${segmentEnd.format('YYYY-MM-DD')}`,
            });
        }

        // Gửi dữ liệu cho frontend
        res.status(200).json({
            totalRevenue,
            numberOfOrders,
            revenuePerOrder,
            bestSellProduct,
            revenueData, // Thêm dữ liệu revenueData
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
