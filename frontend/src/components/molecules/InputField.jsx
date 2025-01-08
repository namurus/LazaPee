import { cn } from '../../lib/utils';

import PropTypes from 'prop-types';

function InputField({ title, children, helperText, className, ...props }) {
  return (
    <div {...props} className={cn('space-y-4', className)}>
      <h2 className='text-sm font-medium text-primary'>{title}</h2>
      {children}
      {helperText && <p className='text-sm text-gray-400'>{helperText}</p>}
    </div>
  );
}

InputField.propTypes = {
  title: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default InputField;
