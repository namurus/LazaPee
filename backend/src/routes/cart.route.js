import { Router } from 'express';
import { fetchAllCartItems, addCartItem, updateCartItem, deleteCartItem } from '../controllers/cart.controller';

const router = Router();

router.get('/', fetchAllCartItems);

router.post('/add', addCartItem);

router.delete('/remove', deleteCartItem);

router.put('/update', updateCartItem);

export default router;