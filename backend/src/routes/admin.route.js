import { Router } from 'express';
import { login, register, createCategory, getCategory, getAllCategories, editCategory } from '../controllers/admin.controller';

import validate from '@/middlewares/validation';
import { loginRules, registerRules, createCategoryRules } from '@/validations/admin.validate';
import multer from 'multer';
import uploadCloud from '@/middlewares/uploadCloud';

const upload = multer();

const router = Router();

router.post('/auth/login', validate(loginRules), login);

router.post('/auth/register', validate(registerRules), register);

router.post('/category', upload.single("thumbnail"), uploadCloud, validate(createCategoryRules), createCategory);

router.get('/category/:categoryId', getCategory);

router.get('/categories', getAllCategories);

router.patch('/category/:categoryId', upload.single("thumbnail"), uploadCloud, editCategory);



export default router;
