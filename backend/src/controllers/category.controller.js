import db from '@/database';

// [POST] /categories
export const createCategory = async (req, res, next) => {
    try {
        const { name, parentId } = req.body;

        // Check the category already exists
        const categoryExists = await db.models.Category.findOne({
            where: {
                name,
                parentId: parentId || null,
            },
        });

        if (categoryExists) {
            return res.status(400).json({ code: 400, message: 'Danh mục đã tồn tại!' });
        }

        // create a new category
        const newCategory = await db.models.Category.create({
            name,
            parentId: parentId || null, // If parentId is null, it's a root category
        });

        return res.status(201).json({ code: 201, data: newCategory });
    } catch (err) {
        next(err); // Handle error
    }
};

//Recursive function to get the entire parent of a category
const getCategoryTree = async (parentId = null) => {
    const categories = await db.models.Category.findAll({
        where: { parentId },
        include: [{
            model: db.models.Category,
            as: 'subcategories',
        }]
    });

    return Promise.all(categories.map(async (category) => {
        const subcategories = await getCategoryTree(category.id); // get subcategories of the current category
        return { ...category.toJSON(), subcategories }; // Include the child category in the parent category
    }));
};

// // [GET] /categories
// export const getAllCategories = async (req, res, next) => {
//     try {
//         const categories = await getCategoryTree();
//         return res.status(200).json({ code: 200, data: categories });
//     } catch (err) {
//         next(err); 
//     }
// };


// // Recursive function to get all parents of a category
// const getBreadcrumb = async (categoryId) => {
//     const category = await db.models.Category.findByPk(categoryId);
//     if (!category || !category.parentId) return [category];

//     const parentCategories = await getBreadcrumb(category.parentId);
//     return [...parentCategories, category];
// };

// // [GET] /categories/:id/breadcrumb
// export const getCategoryBreadcrumb = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const breadcrumb = await getBreadcrumb(id);

//         return res.status(200).json({ code: 200, data: breadcrumb });
//     } catch (err) {
//         next(err);
//     }
// };

// Recursive function to get all parents of a category
const getBreadcrumb = async (categoryId) => {
    const category = await db.models.Category.findByPk(categoryId);

    // Check if category exists
    if (!category) return [];

    // If category has no parent, return itself as the only breadcrumb
    if (!category.parentId) return [category];

    // Recursively fetch the breadcrumb for the parent category
    const parentCategories = await getBreadcrumb(category.parentId);
    return [...parentCategories, category];
};

// [GET] /categories/:id/breadcrumb
export const getCategoryBreadcrumb = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate id
        if (!id) return res.status(400).json({ code: 400, message: 'Category ID is required' });

        const breadcrumb = await getBreadcrumb(id);

        // If breadcrumb is empty, category was not found
        if (breadcrumb.length === 0) {
            return res.status(404).json({ code: 404, message: 'Category not found' });
        }
        
        return res.status(200).json({ code: 200, data: breadcrumb });
    } catch (err) {
        next(err);
    }
};