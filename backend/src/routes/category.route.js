import { Router } from 'express';
import {  getAllCategories, getAllParentCategoryOfProduct} from '../controllers/category.controller';

const router = Router();

router.get('/', getAllCategories);

router.get('/:productid', getAllParentCategoryOfProduct);

export default router;