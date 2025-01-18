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
		const product = await db.models.Product.findOne({
			where: { id: productId },
			include: [
				{
					model: db.models.Category,
					as: 'category',
				},
				{
					model: db.models.Skus,
					as: 'skus',
				},
			],
		});
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
		const perPage = parseInt(req.query.per_page) || 10;
		const page = parseInt(req.query.page) || 1;
		const search = req.query.search || '';
		let count = 0;
		if (search) {
			count = await db.models.Product.count({
				where: {
					productName: { [db.Sequelize.Op.like]: `%${search}%` },
				},
			});
		} else {
			count = await db.models.Product.count();
		}
		const products = await db.models.Product.findAll({
			limit: perPage,
			offset: perPage * (page - 1),
			where: {
				productName: { [db.Sequelize.Op.like]: `%${search}%` },
			},
			include: [
				{
					model: db.models.Category,
					as: 'category',
				},
				{
					model: db.models.Skus,
					as: 'skus',
				},
			],
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
			totalPage: Math.ceil(count / perPage),
		});
	} catch (err) {
		next(err);
	}
};
// [DELETE] /admin/product/:productId
export const deleteProduct = async (req, res, next) => {
	try {
		const { productId } = req.params;
		if (!productId) {
			return res.status(400).json({ code: 400, message: 'productId is required' });
		}
		const row = await db.models.Product.destroy({ where: { id: productId } });
		if (!row) {
			return res.status(404).json({ code: 404, message: 'Product not found!' });
		}
		return res.status(200).json({ code: 200, message: 'Product deleted!' });
	} catch (err) {
		next(err);
	}
};

// [GET] /admin/product/review/:productId

export const getProductReview = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const perPage = parseInt(req.query.per_page) || 10;
		const productId = parseInt(req.params.productId);
		if (!productId) {
			return res.status(400).json({ code: 400, message: 'productId is required' });
		}
		const product = await db.models.Product.findByPk(productId);
		if (!product) {
			return res.status(404).json({ code: 404, message: 'Product not found!' });
		}

		const count = await db.models.Review.count({ where: { productId } });

		const reviews = await db.models.Review.findAll({
			where: { productId },
			limit: perPage,
			offset: perPage * (page - 1),
			include: [
				{
					model: db.models.User,
					as: 'user',
					attributes: ['id', 'email', 'fullName', 'avatar', 'username'],
				},
			],
		});
		return res.status(200).json({ code: 200, reviews, page, perPage, total: count, totalPage: Math.ceil(count / perPage) });
	} catch (error) {}
};
