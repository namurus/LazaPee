import { Router } from 'express';
import { fetchAllProducts, fetchProductById, createProduct, deleteProduct } from '../controllers/product.controller';
import uploadArray from '@/middlewares/uploadArray';
import isSeller from '@/middlewares/isSeller';
import multer from 'multer';

const upload = multer();

const router = Router();

router.get('/', fetchAllProducts);

router.get('/:id', fetchProductById);

router.post('/', isSeller, upload.array('images', 9), uploadArray, createProduct);

router.delete('/:id', isSeller, deleteProduct);

export default router;
