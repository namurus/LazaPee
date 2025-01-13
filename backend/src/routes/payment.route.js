import { Router } from 'express';
import {
    getPaymentsByUser,
    createPayment,
    processPayment,
    getAllPayments,
    cancelPayment,
} from '../controllers/payment.controller';

const router = Router();

// Route to get all payments by user
router.get('/', getPaymentsByUser);

// Route to process payment
router.post('/process', processPayment);


// Route to get all payments (admin only)
router.get('/all', getAllPayments);

// Route to cancel a payment
router.post('/cancel', cancelPayment);

// Route to create a new payment
router.post('/:orderID', createPayment);


export default router;