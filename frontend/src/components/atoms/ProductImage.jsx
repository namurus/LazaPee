import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

function ProductImage({ src, alt, ...rest }) {
  const modifyClassName = rest.className ? rest.className : '';
  rest = {
    ...rest,
    className: twMerge(
      'overflow-hidden rounded-2xl bg-[#F0EEED] p-2',
      modifyClassName
    ),
  };
  return (
    <div {...rest}>
      <img
        src={src}
        alt={alt}
        className='h-full w-full bg-[#F0EEED] object-cover'
      />
    </div>
  );
}

ProductImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ProductImage;
