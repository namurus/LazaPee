import db from '@/database';
import { checkPaid } from '@/until/payment';

// Controller to get payments by user
export const getPaymentsByUser = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const payments = await db.models.Payment.findAll({
            where: { customerId: userId },
            order: [['createdAt', 'DESC']],
        });

        if (!payments.length) {
            return res.status(404).json({ message: 'No payments found' });
        }

        res.status(200).json({
            message: 'payments retrieved successfully',
            payments,
        });
    } catch (error) {
        console.error('Error retrieving payments:', error);
        next(error);
    }
};

// Controller to create a new payment
export const createPayment = async (req, res, next) => {
    try {
        const bankInfo = {
            id: process.env.BANK_ID,
            accountNo: process.env.ACCOUNT_NO,
            accountName: process.env.ACCOUNT_NAME,
            template: process.env.TEMPLATE,
        };

        const customerId = req.user.id;
        const orderID = req.params.orderID; 
        const {paymentMethod} = req.body;

        const order = await db.models.Order.findOne({
            where: {
              id: orderID,
              customerId: customerId
            }
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.status === 'paid') {
            return res.status(400).json({ message: 'Order has already been paid' });
        }

        const amount = order.totalAmount;
        //Create new payment
        const newPayment = await db.models.Payment.create({
            customerId,
            amount: order.totalAmount,
            paymentMethod,
            orderId: orderID,
            description: 'Temporary description', // Tạm thời
            status: 'pending',
        });

        // Update the description of the payment
        await newPayment.update({
            description: `OrderID-${orderID}-Pays-${newPayment.id}`
        });

        const qrCodeData = `https://img.vietqr.io/image/${bankInfo.id}-${bankInfo.accountNo}-${bankInfo.template}.png?amount=${amount}&addInfo=${encodeURIComponent(newPayment.description)}&accountName=${bankInfo.accountName}&paymentId=${newPayment.id}`;
        res.status(201).json({
            message: 'Payment created successfully',
            Payment: newPayment,
            qrCode: qrCodeData,
        });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Error creating payment', error });
    }
}

 // Controller to pay and update the payment status
export const processPayment = async (req, res, next) => {
    try {  
        const { paymentID } = req.body;
        
        // Look for the payment
        const payment = await db.models.Payment.findByPk(paymentID);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
      
        // Kiểm tra nếu trạng thái hiện tại của giao dịch là 'pending'
        if (payment.status !== 'pending') {
            return res.status(400).json({ message: 'Payment is not pending' });
        }

        // Check payment within 5 minutes
        const checkInterval = 10 * 1000; // 10 seconds
        const timeout = 5 * 60 * 1000; // 5 minutes
        let elapsed = 0;

        const checkPaymentStatus = async () => {
            if (elapsed >= timeout) {
                // Over time, update the Payment Transaction status to 'failed'
                payment.status = 'failed';
               // transaction.failureReason = 'Payment timeout';
                await payment.save();
                console.log('Payment failed due to timeout:', paymentID);
                return;
            }

            // check status of the payment from API
            const isPaid = await checkPaid(payment.amount, payment.description);
            if (isPaid.success) {
                // Thanh toán thành công
                payment.status = 'completed';
                await payment.save();
                
               
                //Update the order status
                const order = await db.models.Order.findByPk(payment.orderId);
                if (order) {
                    order.status = 'paid';
                    await order.save();
                }
                console.log('order:', payment.orderId);
                console.log('Payment completed:', paymentID);
                return res.json({ message: 'Payment completed successfully', payment });
            }

            elapsed += checkInterval;
            setTimeout(checkPaymentStatus, checkInterval);
        };

        checkPaymentStatus();
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ message: 'Error processing payment', error });
    }
}

// get All Payments for admin
export const getAllPayments = async (req, res, next) =>{
    try {
        const payments = await db.models.Payment.findAll();
        res.status(200).json({
            message: 'All payments retrieved successfully',
            payments,
        });
    } catch (error) {
        console.error('Error retrieving all payments:', error);
        res.status(500).json({ message: 'Error retrieving all payments', error });
    }
}



