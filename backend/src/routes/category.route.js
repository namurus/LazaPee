import { Router } from 'express';
import {  getCategoriesForCustomer} from '../controllers/category.controller';

const router = Router();

router.get('/', getCategoriesForCustomer);

export default router;