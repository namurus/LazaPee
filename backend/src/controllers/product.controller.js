import db from '@/database';

export const getAllProducts = async (req, res) => {
    try {
        const products = await db.models.Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { id, productName, brand } = req.body;
        const productExists = await db.models.Product.findOne({
            where: { id: id },
        });

        if (productExists) {
            return res.status(400).json({ code: 400, message: 'Product already exists!' });
        }

        const product = await db.models.Product.create({
            id: id,
            productName: productName,
            brand: brand,
        });
        
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
