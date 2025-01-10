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

export const getProductsByCategory = async (req, res) => {
  try {
      const { categoryId } = req.params;
      const { page = 1, limit = 10 } = req.query; // Lấy page và limit từ query string, default: page = 1, limit = 10

      // Kiểm tra xem category có tồn tại không
      const category = await db.models.Category.findByPk(categoryId, {
          include: [
              {
                  model: db.models.Category,
                  as: 'subCategories',
                  attributes: ['id'], // Lấy danh sách ID của danh mục con
              },
          ],
      });

      if (!category) {
          return res.status(404).json({ message: 'Category not found' });
      }

      // Lấy danh sách ID của danh mục và các danh mục con
      const categoryIds = [category.id];
      if (category.subCategories.length > 0) {
          category.subCategories.forEach((subCategory) => {
              categoryIds.push(subCategory.id);
          });
      }

      // Tính toán offset để phân trang
      const offset = (page - 1) * limit;

      // Truy vấn danh sách sản phẩm thuộc các danh mục
      const { rows: products, count: totalProducts } = await db.models.Product.findAndCountAll({
          where: {
              categoryId: categoryIds, // Lọc sản phẩm theo danh mục
          },
          distinct: true,
          include: [
              {
                  model: db.models.ProductImage,
                  as: 'images',
                  attributes: ['id', 'url'], // Lấy hình ảnh sản phẩm
              },
              {
                  model: db.models.Shop,
                  as: 'shop',
                  attributes: ['shop_id', 'shop_name'], // Lấy thông tin cửa hàng
              },
              {
                  model: db.models.Skus,
                  as: 'skus',
                  attributes: ['id', 'price', 'stock_quantity'], // Lấy thông tin SKU
              },
          ],
          attributes: {
              exclude: ['createdAt', 'updatedAt', 'deletedAt'], // Ẩn các trường không cần thiết
          },
          limit: parseInt(limit), // Số lượng sản phẩm mỗi trang
          offset: parseInt(offset), // Vị trí bắt đầu
      });

      // Trả về kết quả
      if (products.length === 0) {
          return res.status(404).json({ message: 'No products found for this category' });
      }

      res.status(200).json({
          message: 'Success',
          category: {
              id: category.id,
              name: category.name,
          },
          products,
          pagination: {
              currentPage: parseInt(page),
              totalPages: Math.ceil(totalProducts / limit),
              totalProducts,
          },
      });
  } catch (error) {
      console.error('Error fetching products by category:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
