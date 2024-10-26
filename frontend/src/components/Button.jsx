import PropTypes from 'prop-types';
export default function Button({ children, onClick, style }) {
  return (
    <button
      className={style ? style : 'rounded-lg bg-black px-4 py-2 text-white'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  style: PropTypes.string,
};
