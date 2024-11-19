import { Router } from 'express';
import {
	createProduct,
	getProduct,
	getAlProducts,
	deleteProduct,
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
	upload.single('thumbnail'),
	uploadCloud,
	validate(createProductRules),
	createProduct
);

router.get('/:productId', getProduct);

router.get('/', getAlProducts);

// router.patch('/:productId', upload.single('thumbnail'), uploadCloud, );

router.delete('/:productId', deleteProduct);

export default router;
