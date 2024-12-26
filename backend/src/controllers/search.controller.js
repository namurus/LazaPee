import db from '@/database';

export const searchProducts = async (req, res, next) => {
    try {
        const { facet, keyword, maxPrice, minPrice, page, color, size, brands } = req.query;

        if (!keyword) {
            return res.status(400).json({ code: 400, message: 'Keyword is required' });
        }

        const whereClause = {
            [db.Sequelize.Op.and]: [
                db.Sequelize.literal(`MATCH (productName) AGAINST (:keyword IN BOOLEAN MODE)`),
            ],
        };

        const replacements = { keyword };

        if (facet) {
            const categories = facet.split(',');
            whereClause[db.Sequelize.Op.and].push({
                categoryId: { [db.Sequelize.Op.in]: categories },
            });
        }

        if (maxPrice) {
            whereClause[db.Sequelize.Op.and].push({
                price: { [db.Sequelize.Op.lte]: maxPrice },
            });
        }

        if (minPrice) {
            whereClause[db.Sequelize.Op.and].push({
                price: { [db.Sequelize.Op.gte]: minPrice },
            });
        }

        if (brands) {
            const brandArray = brands.split(',');
            whereClause[db.Sequelize.Op.and].push({
                brand: { [db.Sequelize.Op.in]: brandArray },
            });
        }

        // Điều kiện liên quan đến size và color
        const skuWhereClause = {
            [db.Sequelize.Op.or]: [],
        };

        if (size) {
            skuWhereClause[db.Sequelize.Op.or].push({
                attributeName: 'size',
                value: size,
            });
        }

        if (color) {
            skuWhereClause[db.Sequelize.Op.or].push({
                attributeName: 'color',
                value: color,
            });
        }

        const limit = 10; // Số lượng sản phẩm trên mỗi trang
        const offset = page ? page * limit : 0;

        const products = await db.models.Product.findAll({
            where: whereClause,
            replacements,
            include: [
                {
                    model: db.models.Skus,
                    as: 'skus',
                    where: skuWhereClause,
                    required: true, // Chỉ lấy các product có SKU thỏa mãn
                },
            ],
            limit: limit,
            offset: offset,
        });

        if (products.length > 0) {
            return res.status(200).json({ code: 200, data: products });
        } else {
            return res.status(404).json({ code: 404, message: 'No products found' });
        }
    } catch (err) {
        return next(err);
    }
};
