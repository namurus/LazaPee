const buildCategoryTree = (categories, parentId = null) => {
  return categories
      .filter(category => category.parentId === parentId)
      .map(category => ({
          id: category.id,
          name: category.name,
          slug: category.slug,            // Thêm trường slug
          thumbnail: category.thumbnail,  // Thêm trường thumbnail
          createdAt: category.createdAt,  // Thêm trường createdAt
          updatedAt: category.updatedAt,  // Thêm trường updatedAt
          deletedAt: category.deletedAt,  // Thêm trường deletedAt
          children: buildCategoryTree(categories, category.id) 
      }));
};

export const getCategoryTree = async (categories) => {
  return buildCategoryTree(categories);
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