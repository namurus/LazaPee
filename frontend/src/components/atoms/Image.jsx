import PropTypes from 'prop-types';

function Image({ src, alt, ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        e.target.onError = null;
        e.target.src = '/fallback_img.jpg';
      }}
      {...props}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Image;
