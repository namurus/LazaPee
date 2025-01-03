import { Router } from 'express';
import {  getAllVouchers, checkVoucher, applyVoucher } from '@/controllers/voucher.controller';

import authenticate from '@/middlewares/authentication';

const router = Router();

router.get('/', authenticate, getAllVouchers);
router.post("/check", authenticate, checkVoucher);
router.post("/apply", authenticate, applyVoucher);

export default router;
