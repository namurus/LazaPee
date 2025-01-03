import { Router } from 'express';
import {
    setTemporaryClosure,
    clearTemporaryClosure,
} from '../controllers/shop.controller';
import authentication from '@/middlewares/authentication';

const router = Router();

router.post('/:shopId/temporary-closure', authentication, setTemporaryClosure);

router.delete('/:shopId/temporary-closure', authentication, clearTemporaryClosure);

export default router;