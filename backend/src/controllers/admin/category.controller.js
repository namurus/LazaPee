import db from '@/database';
import slugify from 'slugify';

// [POST] /admin/category
export const createCategory = async (req, res, next) => {
	try {
		const { name, thumbnail } = req.body;
		const category = await db.models.Category.create({
			name,
			thumbnail,
			slug: slugify(name, { lower: true, remove: /[*+~.()'"!:@]/g }),
			parentId: req.body.parentId || null,
		});
		return res.status(201).json({ code: 201, category });
	} catch (err) {
		next(err);
	}
};

// [GET] /admin/category/:categoryId
export const getCategory = async (req, res, next) => {
	try {
		const { categoryId } = req.params;
		const category = await db.models.Category.findOne({ where: { id: categoryId } });
		if (!category) {
			return res.status(404).json({ code: 404, message: 'Category not found!' });
		}
		return res.status(200).json({ code: 200, category });
	} catch (err) {
		next(err);
	}
};

// [PATCH] /admin/category/:categoryId
export const editCategory = async (req, res, next) => {
	try {
		const { categoryId } = req.params;
		req.body.slug = slugify(req.body.name, { lower: true, remove: /[*+~.()'"!:@]/g });
		if (!categoryId) {
			return res.status(400).json({ code: 400, message: 'Category ID is required!' });
		}
		await db.models.Category.update(req.body, { where: { id: categoryId } });
		return res.status(200).json({ code: 200 });
	} catch (err) {
		next(err);
	}
};

// [GET] /admin/category
export const getAllCategories = async (req, res, next) => {
	try {
		const categories = await db.models.Category.findAll();
		if (categories.length === 0) {
			return res.status(404).json({ code: 404, message: 'No category found!' });
		}
		res.status(200).json({ code: 200, categories });
	} catch (err) {
		next(err);
	}
};

// [DELETE] /admin/category/:categoryId
export const deleteCategory = async (req, res, next) => {
	try {
		await db.models.Category.destroy({ where: { id: req.params.categoryId } });
		res.status(200).json({ code: 200, message: 'Category deleted!' });
	} catch (err) {
		next(err);
	}
};
