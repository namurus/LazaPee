import db from '@/database';

const getCategoryTree = async (parentId = null) => {
    const categories = await db.Category.findAll({
      where: { parentId },
      include: [
        {
          model: db.Category,
          as: 'subcategories',
        },
      ],
      order: [['id', 'ASC']], // Sắp xếp theo ID nếu cần
    });
  
    return Promise.all(
      categories.map(async (category) => ({
        ...category.toJSON(),
        subcategories: await getCategoryTree(category.id), // Gọi đệ quy
      }))
    );
  };

// Return parent categories arr of a product
const getProductBreadcrumb = async (productId) => {
    // Find the product by ID and include its category
    const product = await db.models.Product.findByPk(productId, {
        include: {
            model: db.models.Category,
            as: 'category',
        }
    });

    // Check if product exists and has a category
    if (!product || !product.category) return [];

    const category = product.category;

    // Recursively fetch the breadcrumb for the category's parent
    const getBreadcrumb = async (category) => {
        if (!category || !category.parentId) return [category];

        const parentCategory = await db.models.Category.findByPk(category.parentId);
        const parentCategories = await getBreadcrumb(parentCategory);

        return [...parentCategories, category];
    };

    return getBreadcrumb(category);
};