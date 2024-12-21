import ProductDetailImageGrid from '../molecules/ProductDetailImageGrid';
import { useEffect, useState } from 'react';
import ProductDetailInfo from './../molecules/ProductDetailInfo';
import PropTypes from 'prop-types';

function ProductInforSection({ product }) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://picsum.photos/v2/list?page=2&limit=6'
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      setImages(data.map((item) => item.download_url));
    };
    fetchData();
  }, []);
  return (
    <div className='grid grid-cols-1 gap-10 *:flex-1 md:grid-cols-2'>
      <ProductDetailImageGrid images={images} />
      <ProductDetailInfo product={product} />
    </div>
  );
}

ProductInforSection.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductInforSection;
