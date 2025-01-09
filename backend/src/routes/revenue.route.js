import { Router } from 'express';
import {getRevenue} from '../controllers/revenue.controller';

const router = Router();

router.get('/', getRevenue);

export default router;