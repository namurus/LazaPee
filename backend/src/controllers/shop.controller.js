import db from '@/database';

// Controller to set temporary closure for a shop
export const setTemporaryClosure = async (req, res, next) => {
	try {
		const { shopId } = req.params; // Shop ID passed as a URL parameter
		const { temporaryClosurePeriod, temporaryClosureReason } = req.body; // Closure details in request body

		// // Validate temporary closure period
		// if (![1, 2, 3].includes(temporaryClosurePeriod)) {
		//     return res.status(400).json({
		//         message: 'Invalid closure period. Must be 1, 2, or 3 months.',
		//     });
		// }

		// Find the shop
		const shop = await db.models.Shop.findByPk(shopId);

		if (!shop) {
			return res.status(404).json({ message: 'Shop not found' });
		}

         // Check if the shop is already in a closed state
         if (shop.dateClosed) {
            return res.status(400).json({
                message: `Shop is already in a closed state since ${shop.dateClosed.toISOString().split('T')[0]}.`,
            });
        }

        // Update shop with temporary closure details
        shop.status = 'off';
        shop.temporaryClosurePeriod = temporaryClosurePeriod;
        shop.temporaryClosureReason = temporaryClosureReason;
        shop.dateClosed = new Date();
        await shop.save();

        res.status(200).json({
            message: 'Shop temporary closure details updated successfully',
            shop: {
                shopId: shop.shopId,
                shopName: shop.shopName,
                temporaryClosurePeriod: shop.temporaryClosurePeriod,
                temporaryClosureReason: shop.temporaryClosureReason,
                dateClosed: shop.dateClosed,
            },
        });
    } catch (error) {
        console.error('Error setting shop temporary closure:', error);
        next(error);
    }
};

// Controller to clear temporary closure for a shop
export const clearTemporaryClosure = async (req, res, next) => {
    try {
        const { shopId } = req.params; 

		// Find the shop
		const shop = await db.models.Shop.findByPk(shopId);

		if (!shop) {
			return res.status(404).json({ message: 'Shop not found' });
		}

        // Check if the shop has been closed for at least 7 days
        const now = new Date();
        const closureDate = new Date(shop.dateClosed);

        if (shop.dateClosed && (now - closureDate) / (1000 * 60 * 60 * 24) < 7) {
            return res.status(400).json({
                message: `The shop cannot be reopened. It has been closed for less than 7 days.`,
            });
        }

        // Clear temporary closure details
        shop.status = 'on';
        shop.temporaryClosurePeriod = null;
        shop.temporaryClosureReason = null;
        shop.dateClosed = null;

        await shop.save();

        res.status(200).json({
            message: 'Shop temporary closure details cleared successfully',
            shop: {
                shopId: shop.shopId,
                shopName: shop.shopName,
                temporaryClosurePeriod: shop.temporaryClosurePeriod,
                temporaryClosureReason: shop.temporaryClosureReason,
                dateClosed: shop.dateClosed,
            },
        });
    } catch (error) {
        console.error('Error clearing shop temporary closure:', error);
        next(error);
    }
};

//[GET] /shop/shop-orders
export const getShopOrders = async (req, res) => {
	try {
		const { shopInfo } = req;

		const orders = await db.models.Order.findAll({
			where: { shopId: shopInfo.shopId },
			include:[
				{
				model: db.models.OrderItem,
				as: 'OrderItems',
				attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
				include: [
				{
					model: db.models.Skus,
					as: 'sku', 
					attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
					include: [
					{
						model: db.models.Product,
						as: 'product',
						attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
						include: [
						{
							model: db.models.ProductImage,
							as: 'images',
							attributes: ['url'],
						},
						],
					},
					],
					
				},
				],
			},
			],
		});

		return res.status(200).json({
			code: 200,
			message: 'Orders fetched successfully',
			data: orders,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			code: 500,
			message: error.message,
		});
	}
};

// [POST] /shop/open-shop
export const openShop = async (req, res) => {
	try {
		const { shopName, background, description } = req.body;
		const ownerId = req.user.id;

		await db.models.User.update({ role: 'seller' }, { where: { id: ownerId } });

		// Create the shop
		const shop = await db.models.Shop.create({
			shopName,
			background,
			ownerId,
			description,
			status: 'open',
		});

		const shopWithUser = await db.models.Shop.findOne({
			where: { shopId: shop.shopId },
			include: [
				{
					model: db.models.User,
					as: 'owner',
					attributes: ['avatar', 'fullName', 'email', 'address', 'phone', 'username'],
				},
			],
		});

		return res.status(200).json({
			code: 200,
			data: shopWithUser,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			code: 500,
			message: error.message,
		});
	}
};

// [GET] /shop/shop-details
export const getShopDetails = async (req, res) => {
	try {
		return res.status(200).json({
			code: 200,
			data: {
				shopInfo: req.shopInfo,
				userInfo: req.seller,
			},
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			code: 500,
			message: error.message,
		});
	}
};

// [PATCH] /shop/update
export const updateShop = async (req, res) => {
	try {
		const { shopName, background, description } = req.body;
		const { shopInfo } = req;

		shopInfo.shopName = shopName;
		shopInfo.background = background;
		shopInfo.description = description;

		await shopInfo.save();

		return res.status(200).json({
			code: 200,
			data: shopInfo,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			code: 500,
			message: error.message,
		});
	}
};

// [GET] /shop/product
export const getShopProducts = async (req, res) => {
	try {
		const { shopInfo } = req;

		const products = await db.models.Product.findAll({
			where: { shopId: shopInfo.shopId },
			include: [
				{
					model: db.models.Category,
					as: 'category',
					attributes: ['name', "description", 'thumbnail'],
				},
				{
					model: db.models.ProductImage,
					attributes: ['url'],
					as: 'images',
				},
				{
					model: db.models.Skus,
					attributes: ['size', 'color', 'stock_quantity', 'price'],
					as: 'skus',
				}
			],
		});

		return res.status(200).json({
			code: 200,
			data: products,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			code: 500,
			message: error.message,
		});
	}
};
