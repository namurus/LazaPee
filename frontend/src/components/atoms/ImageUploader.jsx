import { ImagePlus } from 'lucide-react';
import PropTypes from 'prop-types';

function ImageUploader({ onImageUpload }) {
  return (
    <div className='border-2 border-dashed border-gray-300 p-6 text-center'>
      <input
        type='file'
        accept='image/*'
        onChange={onImageUpload}
        className='hidden'
        id='product-image'
      />
      <label
        htmlFor='product-image'
        className='flex cursor-pointer flex-col items-center space-y-2 text-gray-500 hover:text-black'
      >
        <ImagePlus className='h-12 w-12' />
        <span>Thêm hình ảnh</span>
      </label>
    </div>
  );
}
ImageUploader.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default ImageUploader;
