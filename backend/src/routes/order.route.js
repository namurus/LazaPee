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

router.get('/user', getUserOrders);
router.post('/checkout', getCartItemAndUserInfo);
router.post('/addItem', addProductToOrderCheckout);
router.post('/', createOrders);
router.get('/:id', getOrderDetailsById);
router.patch('/:id', updateOrderByID);
router.delete('/:id', cancelledOrderByID);

export default router;