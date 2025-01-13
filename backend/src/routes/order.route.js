import { Router } from 'express';
import {addProductToOrderCheckout,
        createOrders,
        getOrderDetailsById,
        updateOrderByID,
        cancelledOrderByID,
        getUserOrders,
        getCartItemAndUserInfo,
    }from '../controllers/order.controller';

const router = Router();

router.get('/checkout', getCartItemAndUserInfo);
router.post('/addItem', addProductToOrderCheckout);
router.post('/', createOrders);
router.get('/:id', getOrderDetailsById);
router.patch('/:id', updateOrderByID);
router.delete('/:id', cancelledOrderByID);
router.get('/user/:id', getUserOrders);

export default router;