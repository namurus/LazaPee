import { Router } from 'express';
import {
	login,
	register,
	createCategory,
	getCategory,
	getAllCategories,
	editCategory,
	deleteCategory
} from '../controllers/admin.controller';
import isAdmin from '@/middlewares/isAdmin';
import validate from '@/middlewares/validation';
import { loginRules, registerRules, createCategoryRules } from '@/validations/admin.validate';
import multer from 'multer';
import uploadCloud from '@/middlewares/uploadCloud';

const upload = multer();

const router = Router();

router.post('/auth/login', validate(loginRules), login);

router.post('/auth/register', validate(registerRules), register);

router.post(
	'/category',
	isAdmin,
	upload.single('thumbnail'),
	uploadCloud,
	validate(createCategoryRules),
	createCategory
);

router.get('/category/:categoryId', isAdmin, getCategory);

router.get('/categories', isAdmin, getAllCategories);

router.patch('/category/:categoryId', isAdmin, upload.single('thumbnail'), uploadCloud, editCategory);

router.delete('/category/:categoryId', isAdmin, deleteCategory);

export default router;
