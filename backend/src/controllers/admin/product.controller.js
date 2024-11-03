import db from '@/database';
import slugify from 'slugify';

// [POST] /admin/product
export const createProduct = async (req, res, next) => {
	try {
		const { name, price, sale, description, categoryId } = req.body;
		const product = await db.models.Product.create({
			name,
			price,
			sale,
			description,
			categoryId,
			slug: slugify(name, { lower: true, remove: /[*+~.()'"!:@]/g }),
		});
		return res.status(201).json({ code: 201, product });
	} catch (err) {
		next(err);
	}
};
