import db from '@/database';

export const fetchAllProducts = async (req, res, next) => {
	try {
		// Lấy danh sách sản phẩm từ cơ sở dữ liệu
		const products = await db.models.Product.findAll({
			attributes: ['id', 'productName', 'brand', 'description', 'thumbnail'],
			include: [
				{
					model: db.models.Skus,
					as: 'skus',
					attributes: ['id','price'], // Chỉ lấy giá
				},
				{
					model: db.models.ProductImage,
					as: 'images',
					attributes: ['url'],
				},
			],
		});

		// Chỉ giữ `skus[0].price` và loại bỏ các thông tin khác
		const formattedProducts = products.map((product) => ({
			id: product.id,
			productName: product.productName,
			brand: product.brand,
			description: product.description,
			thumbnail: product.thumbnail,
			price: product.skus.length > 0 ? product.skus[0].price : null, // Lấy `price` của `skus[0]`, nếu không có thì `null`
			images: product.images, // Giữ nguyên trường `images`
		}));

		if (formattedProducts.length > 0) {
			return res.status(200).json({ code: 200, data: formattedProducts });
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
			attributes: ['id', 'productName', 'brand', 'description', 'thumbnail'],
			include: [
				{
					model: db.models.Skus,
					as: 'skus',
					attributes: ['id', 'price', 'stock_quantity', 'color', 'size'],
				},
				{
					model: db.models.ProductImage,
					as: 'images',
					attributes: ['url'],
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
		const price = parseFloat(req.body.price);
		const stock_quantity = parseInt(req.body.stock_quantity);
		if (!images || images.length === 0) {
			return res.status(400).json({ code: 400, message: 'Images are required' });
		}

		const thumbnail = images[0];
		// Create the product
		const product = await db.models.Product.create({
			productName: productName,
			shopId: shopId,
			brand: brand,
			thumbnail: thumbnail,
			description: description,
			slug: productName,
			categoryId: categoryId,
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
				stock_quantity: stock_quantity,
				productId: product.id,
			});
		} else {
			const skusArray = JSON.parse(skus);
			skusData = skusArray.map(({ color, size, price, stock_quantity }) => ({
				color,
				size,
				price,
				stock_quantity: stock_quantity,
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
		const { shopId } = req.shopInfo;

		if (!id) {
			return res.status(400).json({ code: 400, message: 'Product ID is required' });
		}

		const product = await db.models.Product.findOne({
			where: { id: id, shopId: shopId },
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
