import { Router } from 'express';
import { createVoucher, updateVoucher, deleteVoucher, getVouchers } from '@/controllers/admin/voucher.controller';
const router = Router();

router.get("/", getVouchers);
router.post('/create', createVoucher);
router.patch("/update/:id", updateVoucher);
router.delete("/delete/:id", deleteVoucher);

export default router;
