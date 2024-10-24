import { Router } from 'express';
import { createCategory, getAllCategories, getCategoryBreadcrumb } from '../controllers/category.controller';

const router = Router();

router.post('/', createCategory);

router.get('/', getAllCategories);

router.get('/:id/breadcrumb', getCategoryBreadcrumb);

export default router;