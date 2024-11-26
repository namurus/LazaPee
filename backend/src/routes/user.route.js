import { Router } from 'express';
import { getMe, updateMe } from '@/controllers/user.controller';
const router = Router();

router.get('/profile', getMe);
router.post('/update', updateMe);

export default router;
