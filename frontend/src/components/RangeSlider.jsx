import { useState } from 'react';
import PropTypes from 'prop-types';

const formater = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

const RangeSlider = ({ rangeMin, rangeMax, minGap }) => {
  const [minValue, setMinValue] = useState((rangeMax - rangeMin) / 4);
  const [maxValue, setMaxValue] = useState(((rangeMax - rangeMin) / 4) * 3);
  const [formatedValue, setFormatedValue] = useState({
    min: formater.format(minValue * 1000),
    max: formater.format(maxValue * 1000),
  });

  const handleMinChange = (e) => {
    const setValue = Math.min(parseInt(e.target.value), maxValue - minGap);
    const value = formater.format(setValue * 1000);
    setFormatedValue({ ...formatedValue, min: value });
    setMinValue(setValue);
  };

  const handleMaxChange = (e) => {
    const setValue = Math.max(parseInt(e.target.value), minValue + minGap);
    const value = formater.format(setValue * 1000);
    setFormatedValue({ ...formatedValue, max: value });
    setMaxValue(setValue);
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
};

export default RangeSlider;
