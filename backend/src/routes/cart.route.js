import { Router } from 'express';
import { fetchAllCartItems, addCartItem, updateCartItem, deleteCartItem } from '../controllers/cart.controller';
import authenticate from '@/middlewares/authentication';

import multer from 'multer';
const router = Router();
const upload = multer();

router.get('/', authenticate, fetchAllCartItems);

router.post('/add', authenticate, upload.none(), addCartItem); 

router.delete('/remove/:id', authenticate, upload.none(), deleteCartItem);

router.put('/update', authenticate, upload.none(), updateCartItem);

export default router;