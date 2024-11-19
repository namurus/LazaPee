import { Router } from 'express';
import {
	createProduct,
	getProduct,
	getAlProducts
} from '@/controllers/admin/product.controller';
import isAdmin from '@/middlewares/isAdmin';
import validate from '@/middlewares/validation';
import multer from 'multer';
import uploadCloud from '@/middlewares/uploadCloud';
import { createProductRules } from '@/validations/admin.validate';
const upload = multer();

const router = Router();

router.post(
	'/',
	isAdmin,
	upload.single('thumbnail'),
	uploadCloud,
	validate(createProductRules),
	createProduct
);

router.get('/:productId', isAdmin, getProduct);

router.get('/', isAdmin, getAlProducts);

// router.patch('/:productId', isAdmin, upload.single('thumbnail'), uploadCloud, );

// router.delete('/:productId', isAdmin, );

export default router;
