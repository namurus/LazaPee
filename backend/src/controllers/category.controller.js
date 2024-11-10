import db from '@/database';
import * as categoryHelper from '../helpers/category.helpers';

  
export const getAllCategories = async (req, res) => {
try {
    const categories = await db.models.Category.findAll({
        order: [['id', 'ASC']],
        include: [
            {
                model: db.models.Category,
                as: 'subcategories',
            },
        ],
    });

    // if (!categories || categories.length === 0) {
    //     return res.status(404).json({ message: 'Categories is empty' });
    // }

    const categoryTree = await categoryHelper.getCategoryTree(categories);
    res.status(200).json({ message: 'Success', data: categoryTree });
} catch (error) {
    res.status(500).json({message: 'Failure' });
}
};

// [GET] parentCategory of a product
export const getAllParentCategoryOfProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate id
        if (!id) {
            return res.status(400).json({ code: 400, message: 'Product ID is required' });
        }

        const breadcrumb = await categoryHelper.getProductBreadcrumb(id);

        // If breadcrumb is empty, product or category was not found
        if (breadcrumb.length === 0) {
            return res.status(404).json({ code: 404, message: 'Product or associated category not found' });
        }

        return res.status(200).json({ code: 200, data: breadcrumb });
    } catch (err) {
        next(err);
    }
};