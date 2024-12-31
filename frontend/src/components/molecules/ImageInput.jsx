import { useState } from 'react';
import ImageUploader from '../atoms/ImageUploader';
import ImagePreviewGrid from './ImagePreviewGrid';

import PropTypes from 'prop-types';

function ImageInput({ maxImages, onSetFiles, ...props }) {
  const [images, setImages] = useState([]);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result]);
        onSetFiles((prevFiles) => [...prevFiles, file]);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
    onSetFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className='space-y-2' {...props}>
      <ImagePreviewGrid images={images} onRemove={handleRemoveImage} />
      {images.length < maxImages && (
        <ImageUploader onImageUpload={handleImageUpload} />
      )}
    </div>
  );
}

ImageInput.propTypes = {
  maxImages: PropTypes.number.isRequired,
};

export default ImageInput;
