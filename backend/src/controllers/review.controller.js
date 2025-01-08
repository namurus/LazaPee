import db from '@/database';

// [GET] /reviews/:productId
export const getProductReview = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const perPage = parseInt(req.query.perPage) || 10;
		const productId = parseInt(req.params.productId);
		const count = await db.models.Review.count({
			where: {
				productId,
			},
		});
		const reviews = await db.models.Review.findAll({
			where: {
				productId,
			},
			include: [
				{
					model: db.models.User,
					as: 'user',
					attributes: ['id', 'username', 'avatar', 'email', 'fullName'],
				},
			],
			limit: perPage,
			offset: (page - 1) * perPage,
			order: [['createdAt', 'DESC']],
		});
		return res.status(200).json({
			code: 200,
			message: 'Success',
			data: reviews,
			total: count,
			totalPage: Math.ceil(count / perPage),
			page,
			perPage,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			code: 500,
			message: 'Internal Server Error',
		});
	}
};

// [POST] /reviews/:productId
export const createReview = async (req, res) => {
	try {
		const productId = parseInt(req.params.productId);
		const { rating, content } = req.body;
		const userId = req.user.id;
		const review = await db.models.Review.create({
			rating,
			content,
			productId,
			userId,
		});
		return res.status(200).json({
			code: 200,
			message: 'Success',
			data: {
				content: review.content,
				rating: review.rating,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			code: 500,
			message: 'Internal Server Error',
		});
	}
};

// [PATCH] /reviews/:reviewId
export const updateReview = async (req, res) => {
	try {
		const reviewId = parseInt(req.params.reviewId);
		const { rating, content } = req.body;
		const userId = req.user.id;
		const review = await db.models.Review.findOne({
			where: {
				id: reviewId,
				userId: userId,
			},
			include: [
				{
					model: db.models.User,
					as: 'user',
					attributes: ['id', 'username', 'avatar', 'email', 'fullName'],
				},
			]
		});
		if (!review) {
			return res.status(404).json({
				code: 404,
				message: 'Review not found',
			});
		}
		review.rating = rating;
		review.content = content;
		const updatedReview = await review.save();
		return res.status(200).json({
			code: 200,
			message: 'Success',
			data: updatedReview,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			code: 500,
			message: 'Internal Server Error',
		});
	}
};

// [DELETE] /reviews/:reviewId
export const deleteReview = async (req, res) => {
	try {
		const reviewId = parseInt(req.params.reviewId);
		const userId = req.user.id;
		await db.models.Review.destroy({
			where: {
				id: reviewId,
				userId: userId,
			},
		});
		return res.status(200).json({
			code: 200,
			message: 'Success',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			code: 500,
			message: 'Internal Server Error',
		});
	}
};
