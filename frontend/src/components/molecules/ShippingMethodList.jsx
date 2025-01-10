import { ChevronsUp, Truck } from 'lucide-react';
import Image from '../atoms/Image';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

const shippingMethodVariants = {
  ['FAST']: {
    displayText: 'Giao hàng nhanh',
    iconSrc: <Truck />,
    description: 'Hàng sẽ được giao trong vòng 5 - 7 ngày',
  },
  ['EXPRESS']: {
    displayText: 'Giao hoả tốc',
    iconSrc: (
      <div className='flex gap-1'>
        <ChevronsUp />
        <Truck />
      </div>
    ),
    description: 'Hàng sẽ được giao trong vòng 24h',
  },
};

function ShippingMethod({ variant, id, value }) {
  const variantValue = shippingMethodVariants[variant];
  return (
    <Label
      htmlFor={id}
      className='flex items-center rounded-3xl border border-border px-6 py-4'
    >
      <div>
        <div className='flex items-center gap-1'>
          <Image
            src={variantValue.iconSrc}
            alt={variantValue.displayText}
            width={24}
            height={24}
            className='w-12'
          />
          <span>|</span>
          <span className='text-center'>{variantValue.displayText}</span>
        </div>
        <p>{variantValue.description}</p>
      </div>
      <RadioGroupItem className='ml-auto' value={value} id={id} />
    </Label>
  );
}

function ShippingMethodList() {
  return (
    <RadioGroup defaultValue='fast'>
      <ShippingMethod variant={'FAST'} id='r1' value='fast' />
      <ShippingMethod variant={'EXPRESS'} id='r2' value='express' />
    </RadioGroup>
  );
}

export default ShippingMethodList;
