import db from '@/database';

// [GET] /admin/orders

export const getAllOrders = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const perPage = parseInt(req.query.perPage) || 10;
		const search = req.query.search || '';
		const results = await db.models.OrderItem.findAndCountAll({
			limit: perPage,
			offset: (page - 1) * perPage,
			include: [
				{
					model: db.models.Skus,
					as: 'sku',
					include: [
						{
							model: db.models.Product,
							as: 'product',
							attributes: ['id', 'productName'],
							where: {
								productName: {
									[db.Sequelize.Op.like]: `%${search}%`,
								},
							},
						},
					],
					
				},
				{
					model: db.models.Order,
					as: 'order',
					include: [
						{
							model: db.models.User,
							as: 'customer',
							attributes: ['id', 'fullName', 'email', 'avatar', 'phone', 'address'],
						},
					],
				},
			],
		});

		return res.status(200).json({
			code: 200,
			message: 'Success',
			data: results.rows,
			total: results.count,
			page: page,
			perPage: perPage,
			totalPage: Math.ceil(results.count / perPage),
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ code: 500, message: 'Internal server error' });
	}
};

// [GET] /admin/order/:id
export const getOrderDetail = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		if (!id) {
			return res.status(400).json({ code: 400, message: 'Invalid id' });
		}

		const order = await db.models.Order.findOne({
			where: {
				id,
			},
			include: [
				{
					model: db.models.User,
					as: 'customer',
					attributes: ['id', 'fullName', 'email', 'avatar', 'phone', 'address'],
				},
				{
					model: db.models.OrderItem,
					as: 'OrderItems',
					where: {
						[db.Sequelize.Op.and]: [
							{
								quantity: {
									[db.Sequelize.Op.gt]: 0,
								},
							},
						],
					},
					include: [
						{
							as: 'sku',
							model: db.models.Skus,
							include: [
								{
									model: db.models.Product,
									as: 'product',
									attributes: ['id', 'productName'],
								},
							],
						},
					],
				},
			],
		});

		if (!order) {
			return res.status(404).json({ code: 404, message: 'Order not found' });
		}

		return res.status(200).json({ code: 200, message: 'Success', data: order });
	} catch (error) {
		console.log(error);
		res.status(500).json({ code: 500, message: 'Internal server error' });
	}
};
