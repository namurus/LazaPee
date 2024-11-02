import { Router } from 'express';
import { fetchAllProducts, fetchProductById, createProduct, deleteProduct } from '../controllers/product.controller';

const router = Router();

router.get('/', fetchAllProducts);

router.get('/:id', fetchProductById);

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

export default router;