import PropTypes from 'prop-types';
import Image from '../atoms/Image';

function ImagePreviewGrid({ images, onRemove }) {
  return (
    <div className='grid grid-cols-9 gap-4'>
      {images.map((image, index) => (
        <div key={index} className='relative'>
          <Image
            src={image}
            alt={`Ảnh sản phẩm ${index + 1}`}
            className='h-24 w-full rounded-md bg-neutral-300 object-cover p-1'
          />
          <button
            onClick={() => onRemove(index)}
            className='absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary leading-none text-secondary hover:bg-red-600'
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}

ImagePreviewGrid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ImagePreviewGrid;
