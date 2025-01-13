import PropTypes from 'prop-types';
import { cn } from '../../lib/utils';
import Image from './Image';

function ProductImage({ src, alt, ...rest }) {
  const modifyClassName = rest.className ? rest.className : '';
  rest = {
    ...rest,
    className: cn(
      'overflow-hidden rounded-2xl bg-[#F0EEED] p-2',
      modifyClassName
    ),
  };
  return (
    <div {...rest}>
      <Image
        src={src}
        alt={alt}
        className='aspect-square h-full w-full bg-[#F0EEED] object-cover'
      />
    </div>
  );
}

ProductImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ProductImage;
