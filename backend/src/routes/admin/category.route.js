import { Router } from 'express';
import {
	createCategory,
	getCategory,
	getAllCategories,
	editCategory,
	deleteCategory,
} from '@/controllers/admin/category.controller';
import validate from '@/middlewares/validation';
import { createCategoryRules } from '@/validations/admin.validate';
import multer from 'multer';
import uploadCloud from '@/middlewares/uploadCloud';

const upload = multer();

const router = Router();

router.post('/', upload.single('thumbnail'), uploadCloud, validate(createCategoryRules), createCategory);

router.get('/:categoryId', getCategory);

router.get('/', getAllCategories);

router.patch('/:categoryId', upload.single('thumbnail'), uploadCloud, editCategory);

router.delete('/:categoryId', deleteCategory);

export default router;
