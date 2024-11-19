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
// [GET] /admin/product/:productId
export const getProduct = async (req, res, next) => {
	try {
		const { productId } = req.params;
		if (!productId) {
			return res.status(400).json({ code: 400, message: 'productId is required' });
		}
		const product = await db.models.Product.findOne({ where: { id: productId } });
		if (!product) {
			return res.status(404).json({ code: 404, message: 'Product not found!' });
		}
		return res.status(200).json({ code: 200, product });
	} catch (err) {
		next(err);
	}
};
// [GET] /admin/product
export const getAlProducts = async (req, res, next) => {
	try {
		console.log(req.query);
		
		const perPage = parseInt(req.query.per_page) || 5;
		const page = parseInt(req.query.page) || 1;
		const count = await db.models.Product.count();
		const products = await db.models.Product.findAll({
			limit: perPage,
			offset: perPage * (page - 1),
		});
		if (!products) {
			return res.status(404).json({ code: 404, message: 'Products not found!' });
		}
		return res.status(200).json({
			code: 200,
			products,
			perPage,
			page,
			total: count,
			totalPage: count % perPage === 0 ? count / perPage : Math.ceil(count / perPage),
		});
	} catch (err) {
		next(err);
	}
};
