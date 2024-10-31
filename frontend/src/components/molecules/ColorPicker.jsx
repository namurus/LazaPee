import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

function getBrightness(hex) {
  if (hex.length === 4) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  // Convert hex color to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function ColorPicker({ colors, pickedColor, onPickColor }) {
  const [selectedColor, setSelectedColor] = useState(pickedColor);
  return (
    <div className='flex flex-wrap gap-2'>
      {colors.map((color) => (
        <button
          key={color}
          className={`flex h-9 w-9 items-center justify-center rounded-full border border-black border-opacity-20`}
          style={{ backgroundColor: color }}
          onClick={() => {
            onPickColor(color);
            setSelectedColor(color);
          }}
        >
          {selectedColor === color && (
            <FaCheck
              className={`w-1/2 ${getBrightness(color) < 128 ? 'text-white' : 'text-black'}`}
            />
          )}
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
