import { Router } from 'express';
import {
    getPaymentsByUser,
    createPayment,
    processPayment,
    getAllPayments,
} from '../controllers/payment.controller';

const router = Router();

// Route to get all payments by user
router.get('/', getPaymentsByUser);

// Route to create a new payment
router.post('/:orderID', createPayment);

// Route to process payment
router.post('/processPayment', processPayment);

// Route to get all payments (admin only)
router.get('/all', getAllPayments);

export default router;