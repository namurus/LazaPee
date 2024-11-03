import db from '@/database';
import slugify from 'slugify';

// [POST] /admin/product
export const createProduct = async (req, res, next) => {
	try {
		req.body.slug = slugify(req.body.productName, { lower: true, remove: /[*+~.()'"!:@]/g });
		const product = await db.models.Product.create(req.body);
		return res.status(201).json({ code: 201, product });
	} catch (err) {
		next(err);
	}
};
