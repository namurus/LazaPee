import { Router } from 'express';
import {  getCategoriesForCustomer,
          getProductsByCategory,
} from '../controllers/category.controller';

const router = Router();

router.get('/', getCategoriesForCustomer);
router.get('/:categoryId', getProductsByCategory);

export default router;