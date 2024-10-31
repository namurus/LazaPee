import PropTypes from 'prop-types';
import StarRating from '../atoms/StarRating';
import CurrencyFormatter from '../../helpers/CurrencyFormatter';
import ProductImage from '../atoms/ProductImage';

function ProductItem({ product }) {
  return (
    <div className='flex h-full cursor-pointer flex-col transition-all [&>*]:mb-4'>
      <ProductImage src={product.thumbnail} alt={product.title} />
      <div className='flex flex-1 flex-col'>
        <div className='flex-1'>
          <h2 className='line-clamp-2 text-balance text-base font-semibold capitalize lg:text-xl'>
            {product.title}
          </h2>
        </div>
        <div className='flex items-center gap-4'>
          <StarRating rating={product.rating} name={`${product.id}-product`} />
        </div>
        <div className='grid grid-cols-4 gap-x-12 text-xl font-semibold lg:text-2xl'>
          <p className='col-span-4'>
            {CurrencyFormatter.formatWithLocaleInfo(
              product.price * 25000,
              'VND'
            )}
          </p>
          <p className='col-span-2 line-through opacity-40'>
            {CurrencyFormatter.formatWithLocaleInfo(
              Math.round(product.price * 1.2 * 10 * 25000) / 10,
              'VND'
            )}
          </p>
          <div className='flex items-center justify-center rounded-xl bg-[#FF3333] bg-opacity-10 px-2 text-[0.625rem] text-[#FF3333] lg:px-4 lg:text-[0.75rem]'>
            -20%
          </div>
        </div>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;
