import db from '@/database';

export const fetchAllProducts = async (req, res, next) => {
    try {
        const products = await db.models.Product.findAll(
            {
                attributes: ['id', 'productName', 'brand', 'description', 'thumbnail', 'image'],
                include: [
                    {
                        model: db.models.Skus,
                        as: 'skus',
                        attributes: ['price', 'stock_quantity','color', 'size'],
                    },
                ],
            }
        );

        if (products.length > 0) {
            return res.status(200).json({ code: 200, data: products });
        } else {
            return res.status(404).json({ code: 404, message: 'No products found' });
        }
    } catch (err) {
        return next(err)
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
                    attributes: ['price', 'stock_quantity','color','size'],
                    
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

        const { productName, price, brand, description, thumbnail, image, skus } = req.body;
        const product = await db.models.Product.create({
            productName,
            brand,
            description,
            thumbnail,
            image,
        });

        if(!skus)
        {
            await db.models.Skus.create({
                color: null,
                size: null,
                price,
                productId: product.id,
            });
        }
        else
        {
        const skus_array = JSON.parse(skus);
        for (let i = 0; i < skus_array.length; i++) {
            const { color, size, price, stock_quantity } = skus_array[i];
            await db.models.Skus.create({
                color: color,
                size: size,
                price,
                stock_quantity,
                productId: product.id,
            });
        }

        return res.status(201).json({ code: 201, message: 'Product created successfully' });
    }

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
}