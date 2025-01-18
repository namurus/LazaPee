import ProductDetailImageGrid from '../molecules/ProductDetailImageGrid';
import ProductDetailInfo from './../molecules/ProductDetailInfo';
import PropTypes from 'prop-types';

function ProductInforSection({ product }) {
  return (
    <div className='grid grid-cols-1 gap-10 *:flex-1 md:grid-cols-2'>
      <ProductDetailImageGrid
        images={
          product.images.length > 0 ? product.images : [product.thumbnail]
        }
      />
      <ProductDetailInfo product={product} />
    </div>
  );
}

ProductInforSection.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductInforSection;
