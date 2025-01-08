import { Router } from 'express';
import { getProductReview, createReview, updateReview, deleteReview } from '../controllers/review.controller';

import authenticate from '@/middlewares/authentication';

const router = Router();

router.get('/:productId', getProductReview);
router.post('/:productId', authenticate, createReview);
router.patch('/:reviewId', authenticate, updateReview);
router.delete('/:reviewId', authenticate, deleteReview);

export default router;
