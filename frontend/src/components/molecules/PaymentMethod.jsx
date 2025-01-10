import { CircleCheck, PackageCheck } from 'lucide-react';
import Image from '../atoms/Image';
import { useState } from 'react';

const paymentMethodVariants = {
  ['MOMO']: {
    displayText: 'Thanh toán qua MoMo',
    iconSrc: '/images/momo-icon.svg',
  },
  ['COD']: {
    displayText: 'Thanh toán khi nhận hàng',
    iconSrc: (
      <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-secondary'>
        <PackageCheck />
      </div>
    ),
  },
};

function PaymentMethod({ variant, active, onClick }) {
  return (
    <div
      className='flex max-w-32 cursor-pointer flex-col items-center gap-2'
      onClick={() => onClick(variant)}
    >
      <div className='relative flex min-w-28 items-center justify-center rounded-lg border border-border p-4'>
        <Image
          src={paymentMethodVariants[variant].iconSrc}
          alt={variant}
          width={24}
          height={24}
          className='w-12'
        />
        {active && (
          <div className='bg-primary-500 absolute right-0 top-0 flex h-6 w-6 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full text-secondary'>
            <CircleCheck className='fill-primary' />
          </div>
        )}
      </div>
      <span className='text-center'>
        {paymentMethodVariants[variant].displayText}
      </span>
    </div>
  );
}

function PaymentMethodList() {
  const [activePaymentMethod, setActivePaymentMethod] = useState('MOMO');

  const handlePaymentMethodClick = (variant) => {
    setActivePaymentMethod(variant);
  };
  return (
    <div className='flex gap-4'>
      {Object.keys(paymentMethodVariants).map((variant, index) => (
        <PaymentMethod
          key={index}
          variant={variant}
          active={activePaymentMethod === variant}
          onClick={handlePaymentMethodClick}
        />
      ))}
    </div>
  );
}

export { PaymentMethod, PaymentMethodList };
