import { Router } from 'express';
import {getRevenue} from '../controllers/revenue.controller';
import isSeller from '@/middlewares/isSeller';

const router = Router();

router.get('/',isSeller, getRevenue);

export default router;