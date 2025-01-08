import PropTypes from 'prop-types';

function IconCircle({ icon, color, ...props }) {
  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-${color}-500 p-1 text-white`}
      {...props}
    >
      {icon}
    </div>
  );
}
IconCircle.propTypes = {
  icon: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
};

export default IconCircle;
