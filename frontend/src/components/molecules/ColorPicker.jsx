import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';

function ColorPicker({ colors, pickedColor, onPickColor }) {
  return (
    <div className='flex flex-wrap gap-2'>
      {colors.map((color) => (
        <button
          key={color}
          className={`flex h-9 w-9 items-center justify-center rounded-full border border-black border-opacity-20`}
          style={{ backgroundColor: color }}
          onClick={() => onPickColor(color)}
        >
          {pickedColor === color && <FaCheck className='w-1/2 text-white' />}
        </button>
      ))}
    </div>
  );
}

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  pickedColor: PropTypes.string,
  onPickColor: PropTypes.func,
};

export default ColorPicker;
