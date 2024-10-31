import PropType from 'prop-types';
import StarRating from '../atoms/StarRating';
import CurrencyFormatter from '../../helpers/CurrencyFormatter';
import ColorPicker from './ColorPicker';
import SizeList from './SizeList';
import QuantitySelector from '../atoms/QuantitySelector';
import InverseButton from '../atoms/InverseButton';

const config = {
  priceRange: {
    min: 0,
    max: 50000,
    priceGap: 100,
  },
  colors: [
    '#38BE40',
    '#EF0000',
    '#F5D936',
    '#F17516',
    '#2ECCF3',
    '#004EF0',
    '#7435EF',
    '#EE1B9F',
    '#FFFFFF',
    '#000000',
  ],
  sizes: [
    'XX-Small',
    'X-Small',
    'Small',
    'Medium',
    'Large',
    'X-Large',
    'XX-Large',
  ],
};

function ProductDetailInfo({ product }) {
  return (
    <div className='flex flex-col gap-4 *:py-6'>
      <div className='line-below space-y-3'>
        <h1 className='font-display text-2xl leading-7 lg:text-[2.5rem]'>
          {product.title}
        </h1>
        <StarRating rating={product.rating} name={`${product.id}-product`} />
        <div className='flex gap-3 text-2xl font-semibold'>
          <p>
            {CurrencyFormatter.formatWithLocaleInfo(
              product.price * 25000,
              'VND'
            )}
          </p>
          <p className='line-through opacity-30'>
            {CurrencyFormatter.formatWithLocaleInfo(
              Math.round(product.price * 1.2 * 10 * 25000) / 10,
              'VND'
            )}
          </p>
          <div className='flex items-center justify-center rounded-full bg-[#FF3333] bg-opacity-10 px-3 py-[0.375rem] text-sm font-normal leading-none text-[#FF3333] lg:px-4 lg:text-[0.75rem]'>
            -20%
          </div>
        </div>
        <p className='text-sm font-light opacity-60 lg:text-base'>
          {product.description}
        </p>
      </div>
      <div className='line-below'>
        <h2 className='mb-4 text-sm opacity-60'>Select Colors</h2>
        <ColorPicker colors={config.colors} />
      </div>
      <div className='line-below'>
        <h2 className='mb-4 text-sm opacity-60'>Choose Size</h2>
        <SizeList sizes={config.sizes} onPickSize={() => {}} />
      </div>
      <div className='flex gap-3'>
        <QuantitySelector defaultQuantity={1} className='h-[52px] px-4 py-3' />
        <InverseButton
          style={'rounded-full py-4 px-[3.375rem] leading-none text-sm'}
        >
          Add to Cart
        </InverseButton>
      </div>
    </div>
  );
}

ProductDetailInfo.propTypes = {
  product: PropType.object.isRequired,
};

export default ProductDetailInfo;
