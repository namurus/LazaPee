import { Router } from 'express';
import { getAllOrders, getOrderDetail } from '@/controllers/admin/order.controller';

const router = Router();

router.get('/', getAllOrders);
router.get('/:id', getOrderDetail);

export default router;
