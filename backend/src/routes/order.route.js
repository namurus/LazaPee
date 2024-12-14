import { Router } from 'express';
import {addProductToOrderCheckout,
        createOrders,
        getOrderDetailsById,
        updateOrderByID,
        deleteOrderByID,
    }from '../controllers/order.controller';

const router = Router();

router.post('/addItem', addProductToOrderCheckout);
router.post('/', createOrders);
router.get('/:id', getOrderDetailsById);
router.patch('/:id', updateOrderByID);
router.delete('/:id', deleteOrderByID);
//router.get('', getUserOrders);

export default router;