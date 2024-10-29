import { Router } from 'express';
import {  getAllCategories, getAllParentCategoryOfProduct} from '../controllers/category.controller';

const router = Router();

router.get('/customer/Categories', getAllCategories);

router.get('/:id/parentCategory', getAllParentCategoryOfProduct);

export default router;