import { useLocation } from 'react-router-dom';
import Image from '../atoms/Image';
import { useEffect, useState } from 'react';
import { post } from '../../api/config';
import { Button } from '../ui/button';

function QRPage() {
  const [message, setMessage] = useState(null);
  const location = useLocation();

  const qrCode = location.state?.qrCode;
  const orders = location.state?.orderIds;
  const paymentId = location.state?.paymentId;

  useEffect(() => {
    async function processPayment() {
      try {
        const response = await post('/payment/process', {
          paymentID: paymentId,
          orderIDs: orders,
        });
        console.log(response);
        if (!response) {
          setMessage('Có lỗi xảy ra khi thanh toán, vui lòng thử lại sau');
        } else {
          setMessage('Thanh toán thành công');
        }
      } catch (error) {
        console.log(error);
        setMessage('Thanh toán thất bại do hết hạn');
      }
    }
    processPayment();
  }, [orders, paymentId]);
  if (!qrCode) {
    return <div>Invalid QR code</div>;
  }

  const handleCancel = async () => {
    try {
      const response = await post('/payment/cancel', {
        paymentID: paymentId,
      });
      console.log(response);
      setMessage('Thanh toán đã bị huỷ');
    } catch (error) {
      console.log(error);
      setMessage('Huỷ thanh toán thất bại');
    }
  };

  return (
    <div className='flex h-full flex-col items-center justify-center p-4'>
      {message ? (
        <p>{message}</p>
      ) : (
        <>
          <h1 className='text-2xl font-bold'>
            Quét mã QR để thanh toán đơn hàng
          </h1>
          <Image src={qrCode} alt='QR code' />
          <Button onClick={handleCancel}>Huỷ thanh toán</Button>
        </>
      )}
    </div>
  );
}

export default QRPage;
