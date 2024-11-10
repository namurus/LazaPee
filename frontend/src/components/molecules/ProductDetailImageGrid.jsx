import PropsType from 'prop-types';
import { useEffect, useState } from 'react';
import ProductImage from '../atoms/ProductImage';
import { twMerge } from 'tailwind-merge';
import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from '@/components/ui/carousel';

function ProductDetailImageGrid({ images, ...rest }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

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
        className='h-full flex-1 p-4 lg:order-last'
      />
      <Carousel
        orientation={`${screenWidth > 1440 ? 'vertical' : 'horizontal'}`}
        className='lg:w-[9.5rem]'
      >
        <CarouselContent className='h-[30rem]'>
          {images.map((image, index) => {
            return (
              <CarouselItem key={index} className='basis-1/3'>
                <ProductImage
                  src={image}
                  alt={`product-${index}`}
                  onClick={() => handleImageClick(index)}
                  className='h-full w-full object-cover'
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

ProductDetailImageGrid.propTypes = {
  images: PropsType.array.isRequired,
};

export default ProductDetailImageGrid;
