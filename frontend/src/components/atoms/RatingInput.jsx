import { useState } from 'react';
import PropTypes from 'prop-types';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const RatingInput = ({ name, defaultValue = 0, onChange }) => {
  const [rating, setRating] = useState(defaultValue);
  const [hover, setHover] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
    onChange?.(value);
  };

  return (
    <div className='flex gap-1'>
      {[1, 2, 3, 4, 5].map((star) => (
        <label
          key={star}
          className='cursor-pointer'
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          <input
            type='radio'
            name={name}
            value={star}
            checked={rating === star}
            onChange={() => handleRatingChange(star)}
            className='hidden'
          />
          <Star
            className={cn(
              'h-6 w-6 transform-gpu',
              'transition-all duration-200 ease-in-out',
              'hover:scale-110',
              hover >= star || rating >= star
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-none text-gray-300'
            )}
          />
        </label>
      ))}
    </div>
  );
};

RatingInput.propTypes = {
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
};

export default RatingInput;
