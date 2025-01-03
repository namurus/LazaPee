import { Router } from 'express';
import { getMe, updateMe, forgotPassword, otp, resetPassword } from '@/controllers/user.controller';

import multer from 'multer';
import uploadCloud from '@/middlewares/uploadCloud';
import authenticate from '@/middlewares/authentication';

const upload = multer();
const router = Router();

router.get('/profile', authenticate, getMe);
router.patch('/update', authenticate, upload.single('avatar'), uploadCloud, updateMe);
router.post('/register-shop', authenticate, updateMe);

router.post('/password/forgot', forgotPassword);
router.post('/password/otp', otp);
router.post('/password/reset', resetPassword);

export default router;
