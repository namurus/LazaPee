import PropTypes from 'prop-types';
import StarRating from '../atoms/StarRating';
import CurrencyFormatter from '../../helpers/CurrencyFormatter';
import ProductImage from '../atoms/ProductImage';
import { Badge } from '../ui/badge';
import { discountPercentageToPrice } from '../../helpers/CaculationHelper';

function ProductItem({ product }) {
  return (
    <div className='flex h-full cursor-pointer flex-col transition-all [&>*]:mb-4'>
      <ProductImage src={product.thumbnail} alt={product.productName} />
      <div className='flex flex-1 flex-col'>
        <div className='flex-1'>
          <h2 className='line-clamp-2 text-balance text-base font-semibold capitalize lg:text-xl'>
            {product.productName}
          </h2>
        </div>
        <StarRating
          rating={product.rating ? product.rating : 0}
          name={`${product.id}-product`}
        />
        <div className='flex flex-wrap gap-4 text-xl font-semibold lg:text-2xl'>
          <p>
            {CurrencyFormatter.formatWithLocaleInfo(
              isNaN(product.price) ? 0 : product.price * 25000,
              'VND'
            )}
          </p>
          <p className='line-through opacity-40'>
            {CurrencyFormatter.formatWithLocaleInfo(
              Math.round(
                isNaN(product.discount)
                  ? 0
                  : discountPercentageToPrice(product.price, product.discount)
              ) / 10,
              'VND'
            )}
          </p>
          <Badge className='justify-center rounded-full bg-red-400 bg-opacity-10 px-2 py-2 text-sm text-red-500'>
            {isNaN(product.discount) ? 0 : product.discount}%
          </Badge>
        </div>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;
