import { useState } from 'react';
import Textarea from '../atoms/Textarea';
import PropTypes from 'prop-types';

function LargeTextInputField({ maxLength, ...props }) {
  const [value, setValue] = useState('');
  return (
    <div className='space-y-2'>
      <Textarea
        id='text-input'
        maxLength={maxLength}
        onInput={(e) => setValue(e.target.value)}
        {...props}
        className='w-full rounded-md border px-3 py-2'
      />
      <p className='text-right text-sm text-gray-500'>
        {value.length}/{maxLength}
      </p>
    </div>
  );
}
LargeTextInputField.propTypes = {
  maxLength: PropTypes.number.isRequired,
};

export default LargeTextInputField;
