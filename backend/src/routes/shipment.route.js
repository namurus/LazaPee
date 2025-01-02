import { Router } from 'express';
import { getNearbyShip, getNearbyPost } from '@/controllers/shipment.controller';

const router = Router();

router.get('/nearby-ship', getNearbyShip);

router.get('/nearby-post', getNearbyPost);

export default router;
