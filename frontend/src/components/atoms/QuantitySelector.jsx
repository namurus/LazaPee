import Button from './Button';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

function QuantitySelector({ defaultQuantity, handleQuantityChange, ...rest }) {
  const [quantity, setQuantity] = useState(defaultQuantity);

  const handleAdd = () => {
    setQuantity(quantity + 1);
    handleQuantityChange(quantity + 1);
  };

  const handleSubtract = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      handleQuantityChange(quantity - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value < 1) return;
    handleQuantityChange(value);
  };

  const modifyClassName = rest.className ? rest.className : '';
  rest = {
    ...rest,
    className: twMerge(
      'grid h-full max-w-40 max-w-48 grid-cols-3 gap-4 rounded-full bg-[#F0F0F0] px-5 py-2 text-sm font-light lg:py-3 content-center',
      modifyClassName
    ),
  };

  return (
    <div {...rest}>
      <Button
        style={'border-0 flex items-center justify-center'}
        onClick={handleSubtract}
      >
        <FaMinus />
      </Button>

      <input
        type='number'
        value={quantity}
        onChange={(e) => handleInputChange(e)}
        min={1}
        className='flex items-center justify-center border-none bg-transparent text-center font-semibold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
      />

      <Button
        style={'border-0 flex items-center justify-center'}
        onClick={handleAdd}
      >
        <FaPlus />
      </Button>
    </div>
  );
}

QuantitySelector.propTypes = {
  defaultQuantity: PropTypes.number,
  handleQuantityChange: PropTypes.func,
};

export default QuantitySelector;
