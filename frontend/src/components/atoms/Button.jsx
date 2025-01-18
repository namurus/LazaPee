import PropTypes from 'prop-types';
import { cn } from '../../lib/utils';
function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  icon: Icon,
}) {
  const variantStyles = {
    primary: 'bg-primary hover:bg-neutral hover:text-primary text-secondary',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };
  return (
    <button
      className={cn(
        `flex items-center justify-center rounded-md px-4 py-2 transition-colors ${variantStyles[variant]}`,
        className
      )}
      onClick={onClick}
    >
      {Icon && <Icon className='mr-2 h-4 w-4' />}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  className: PropTypes.string,
  icon: PropTypes.elementType,
};

export default Button;
