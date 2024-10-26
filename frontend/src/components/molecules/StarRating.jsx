import PropTypes from 'prop-types';

function StarRating({ rating, name }) {
  return (
    <div className='flex gap-1'>
      {[...Array(5)].map((_, index) => {
        const fillPercentage = parseInt(
          Math.max(0, Math.min(100, (rating - index) * 100))
        );

        return (
          <svg
            key={index}
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            viewBox='0 0 20 20'
          >
            <defs>
              <linearGradient
                id={`star-fill-${name}-${index}`}
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'
              >
                <stop offset={`${fillPercentage}%`} stopColor='#FEC244' />
                <stop offset={`${fillPercentage}%`} stopColor='#E5E7EB' />
              </linearGradient>
            </defs>
            <path
              fillRule='evenodd'
              d='M10 0l2.45 6.29 6.71.61-5.14 4.45 1.55 6.68-6.57-3.95-6.57 3.95 1.55-6.68-5.14-4.45 6.71-.61L10 0z'
              fill={`url(#star-fill-${name}-${index})`}
            />
          </svg>
        );
      })}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  name: PropTypes.string,
};

export default StarRating;
