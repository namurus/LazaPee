import * as categoryHelper from '../helpers/category.helpers';
  
export const getAllCategories = async (req, res) => {
try {
    const categories = await categoryHelper.getCategoryTree();
    res.status(200).json({ success: true, data: categories });
} catch (error) {
    console.error('Lỗi khi lấy danh mục:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
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