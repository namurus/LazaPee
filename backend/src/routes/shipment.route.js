import { Router } from 'express';
import { getNearbyShip, getNearbyPost, getShippingCompany } from '@/controllers/shipment.controller';
const router = Router();

router.get('/nearbyship', getNearbyShip);

router.get('/nearbypost', getNearbyPost);

router.get('/shippingCompany', getShippingCompany);

export default router;
