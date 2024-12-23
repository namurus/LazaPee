import { Router } from 'express';
import { getNearbyPost } from '@/controllers/shipment.controller';

const router = Router();

router.get('/nearby-post', getNearbyPost);

export default router;
