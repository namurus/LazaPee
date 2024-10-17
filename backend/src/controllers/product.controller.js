import db from '@/database';

export const fetchAllProducts = async (req, res, next) => {
    try {
        const products = await db.models.Product.findAll();

        if (products.length > 0) {
            return res.status(200).json({ code: 200, data: products });
        } else {
            return res.status(404).json({ code: 404, message: 'No products found' });
        }
    } catch (err) {
        return next(err)
    }
};

export const fetchProductById = async (req,res,next) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(400).json({ code: 400, message: 'Product ID is required' });
        }

        const product = await db.models.Product.findOne({
            where: { id: id },
        });

        if (product) {
            return res.status(200).json({ code: 200, data: product });
        } else {
            return res.status(404).json({ code: 404, message: 'Product not found' });
        }
    } catch (err) {
        return next(err)
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const { id, productName, price } = req.body;
        const productExists = await db.models.Product.findOne({
            where: { id: id },
        });

        if (productExists) {
            return res.status(400).json({ code: 400, message: 'Product already exists!' });
        }

        const product = await db.models.Product.create({
            id: id,
            productName: productName,
            price: price,
        });

        res.status(201).json(product);
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