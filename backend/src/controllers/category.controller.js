import db from '@/database';

export const getCategoriesForCustomer = async (req, res) => {
  try {
    const categories = await db.models.Category.findAll();

    const buildTreeCategory = (parentId = null) => {
      return categories
        .filter(category => category.parentId === parentId)
        .map(category => ({
          ...category.dataValues,
          subCategories: buildTreeCategory(category.id),
        }));
    };

    const categoryTree = buildTreeCategory();

    if (categoryTree.length === 0) {
      return res.status(404).json({ message: 'No categories found' });
    }

    res.status(200).json({ code: 200, categories: categoryTree });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};