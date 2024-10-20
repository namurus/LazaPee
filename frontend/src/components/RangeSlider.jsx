import { useState } from 'react';
import PropTypes from 'prop-types';
import CurrencyFormatter from '../helpers/CurrencyFormatter';

const RangeSlider = ({ rangeMin, rangeMax, minGap, onChange }) => {
  const [minValue, setMinValue] = useState((rangeMax - rangeMin) / 4);
  const [maxValue, setMaxValue] = useState(((rangeMax - rangeMin) / 4) * 3);
  const [formatedValue, setFormatedValue] = useState({
    min: CurrencyFormatter.formatWithLocaleInfo(minValue * 1000, 'VND'),
    max: CurrencyFormatter.formatWithLocaleInfo(maxValue * 1000, 'VND'),
  });

  const handleMinChange = (e) => {
    const setValue = Math.min(parseInt(e.target.value), maxValue - minGap);
    const value = CurrencyFormatter.formatWithLocaleInfo(
      setValue * 1000,
      'VND'
    );
    setFormatedValue({ ...formatedValue, min: value });
    setMinValue(setValue);
    if (onChange) onChange(setValue, maxValue);
  };

  const handleMaxChange = (e) => {
    const setValue = Math.max(parseInt(e.target.value), minValue + minGap);
    const value = CurrencyFormatter.formatWithLocaleInfo(
      setValue * 1000,
      'VND'
    );
    setFormatedValue({ ...formatedValue, max: value });
    setMaxValue(setValue);
    if (onChange) onChange(minValue, setValue);
  };

  return (
    <div className='mt-8 w-full'>
      <div className='relative h-1 w-full overflow-hidden rounded-md bg-neutral'>
        <div
          className='roudned-md absolute left-[25%] right-[25%] h-1 bg-accent'
          style={{
            left: `${(minValue / rangeMax) * 100}%`,
            right: `${(1 - maxValue / rangeMax) * 100}%`,
          }}
        ></div>
      </div>
      <div className='relative'>
        <input
          type='range'
          name='range-min'
          id='range-min'
          min={rangeMin}
          max={rangeMax}
          value={minValue}
          onChange={handleMinChange}
          className='rounded-slider-thumb pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent'
        />
        <input
          type='range'
          name='range-max'
          id='range-max'
          min={rangeMin}
          max={rangeMax}
          value={maxValue}
          onChange={handleMaxChange}
          className='rounded-slider-thumb pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent'
        />
      </div>

      <div className='mt-4 flex w-full max-w-xl justify-between'>
        <span className='text-sm'>Min: {formatedValue.min}</span>
        <span className='text-sm'>Max: {formatedValue.max}</span>
      </div>
    </div>
  );
};

RangeSlider.propTypes = {
  rangeMin: PropTypes.number.isRequired,
  rangeMax: PropTypes.number.isRequired,
  minGap: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

export default RangeSlider;
