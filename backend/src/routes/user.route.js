import { Router } from 'express';
import { getMe, updateMe } from '@/controllers/user.controller';

import multer from 'multer';
import uploadCloud from '@/middlewares/uploadCloud';

const upload = multer();
const router = Router();

router.get('/profile', getMe);
router.patch('/update', upload.single('avatar'), uploadCloud, updateMe);

export default router;
