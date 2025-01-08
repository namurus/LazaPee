import { Router } from 'express';
import { fetchAllCartItems, addCartItem, updateCartItem, deleteCartItem } from '../controllers/cart.controller';
import authenticate from '@/middlewares/authentication';

const router = Router();

router.get('/', authenticate, fetchAllCartItems);

router.post('/add', authenticate, addCartItem);

router.delete('/remove', authenticate, deleteCartItem);

router.put('/update', authenticate, updateCartItem);

export default router;