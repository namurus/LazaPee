import db from '@/database';

export const fetchAllProducts = async (req, res, next) => {
	try {
		const products = await db.models.Product.findAll({
			attributes: ['id', 'productName', 'brand', 'description', 'thumbnail'],
			include: [
				{
					model: db.models.Skus,
					as: 'skus',
					attributes: ['price', 'stock_quantity', 'color', 'size'],
				},
				{
					model: db.models.ProductImage,
					as: 'images',
					attributes: ['url'],
				},
			],
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

export const fetchProductById = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ code: 400, message: 'Product ID is required' });
		}

		const product = await db.models.Product.findOne({
			where: { id },
			attributes: ['id', 'productName', 'brand', 'description', 'thumbnail', 'image'],
			include: [
				{
					model: db.models.Skus,
					as: 'skus',
					attributes: ['price', 'stock_quantity', 'color', 'size'],
				},
			],
		});

		if (product) {
			return res.status(200).json({ code: 200, data: product });
		} else {
			return res.status(404).json({ code: 404, message: 'Product not found' });
		}
	} catch (err) {
		return next(err);
	}
};
export const createProduct = async (req, res, next) => {
	try {
		const { shopId } = req.shopInfo;
		const { images, productName, brand, description, skus, categoryId } = req.body;

		if (!images || images.length === 0) {
			return res.status(400).json({ code: 400, message: 'Images are required' });
		}

		const thumbnail = images[0];

		// Create the product
		const product = await db.models.Product.create({
			productName,
			brand,
			description,
			thumbnail,
			shopId,
			categoryId,
		});

		// Insert product images in bulk
		const productImages = images.map((url) => ({
			url,
			productId: product.id,
		}));
		await db.models.ProductImage.bulkCreate(productImages);

		let skusData = [];
		if (!skus) {
			// Default SKU if no skus provided
			skusData.push({
				color: null,
				size: null,
				price,
				stock_quantity: null,
				productId: product.id,
			});
		} else {
			const skusArray = JSON.parse(skus);
			skusData = skusArray.map(({ color, size, price, stock_quantity }) => ({
				color,
				size,
				price,
				stock_quantity,
				productId: product.id,
			}));
		}

		// Insert skus in bulk
		await db.models.Skus.bulkCreate(skusData);

		// Fetch the product with associated images and skus
		const createdProduct = await db.models.Product.findOne({
			where: { id: product.id },
			include: [
				{ model: db.models.ProductImage, as: 'images' },
				{ model: db.models.Skus, as: 'skus' },
			],
		});

		return res.status(201).json({
			code: 201,
			message: 'Product created successfully',
			product: createdProduct,
		});
	} catch (err) {
		next(err);
	}
};

export const deleteProduct = async (req, res, next) => {
	try {
		const id = req.params.id;

		if (!id) {
			return res.status(400).json({ code: 400, message: 'Product ID is required' });
		}

		const product = await db.models.Product.findOne({
			where: { id: id },
		});

		if (!product) {
			return res.status(404).json({ code: 404, message: 'Product not found' });
		}

		await db.models.Product.destroy({
			where: { id: id },
		});

		return res.status(200).json({ code: 200, message: 'Product deleted successfully' });
	} catch (err) {
		return next(err);
	}
};
