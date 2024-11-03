import PropsType from 'prop-types';
import { useState } from 'react';
import ProductImage from '../atoms/ProductImage';
import { twMerge } from 'tailwind-merge';

function ProductDetailImageGrid({ images, ...rest }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setActiveImageIndex(index);
  };
  const classStyling = rest.className ? rest.className : '';
  return (
    <div
      className={`${twMerge('mt-5 flex flex-col gap-3 lg:flex-row', classStyling)}`}
    >
      <ProductImage
        src={images[activeImageIndex]}
        className='order-last h-full flex-1 p-4'
      />
      <div className='flex max-h-[33.125rem] gap-3 overflow-auto lg:flex-col'>
        {images.map((image, index) => (
          <ProductImage
            key={index}
            src={image}
            alt={`product-${index}`}
            onClick={() => handleImageClick(index)}
            className={`aspect-[0.91] min-h-28 w-28 overflow-hidden lg:w-[9.5rem] ${index === activeImageIndex ? 'border-2 border-black' : ''} `}
          />
        ))}
      </div>
    </div>
  );
}

ProductDetailImageGrid.propTypes = {
  images: PropsType.array.isRequired,
};

export default ProductDetailImageGrid;
