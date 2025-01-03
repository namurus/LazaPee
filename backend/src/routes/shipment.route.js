import { Router } from 'express';
import { getNearbyShip, getNearbyPost, testAPI } from '@/controllers/shipment.controller';
const router = Router();

router.get('/nearbyship', getNearbyShip);

router.get('/nearbypost', getNearbyPost);

// for testing purpost
router.get('/test', testAPI)

export default router;
