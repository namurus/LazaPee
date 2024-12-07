import { Router } from 'express';
import {
	createCategory,
	getCategory,
	getAllCategories,
	editCategory,
	deleteCategory,
} from '@/controllers/admin/category.controller';
import isAdmin from '@/middlewares/isAdmin';
import validate from '@/middlewares/validation';
import { createCategoryRules } from '@/validations/admin.validate';
import multer from 'multer';
import uploadCloud from '@/middlewares/uploadCloud';

const upload = multer();

const router = Router();

router.post(
	'/',
	isAdmin,
	upload.single('thumbnail'),
	uploadCloud,
	validate(createCategoryRules),
	createCategory
);

router.get('/:categoryId', isAdmin, getCategory);

router.get('/', isAdmin, getAllCategories);

router.patch('/:categoryId', isAdmin, upload.single('thumbnail'), uploadCloud, editCategory);

router.delete('/:categoryId', isAdmin, deleteCategory);

export default router;
