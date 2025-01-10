import PropTypes from 'prop-types';

import { cn } from '../../lib/utils';

function LoadingSpinner({ className }) {
  return (
    <div className={'flex w-full items-center justify-center'} aria-busy='true'>
      <div
        className={cn(
          'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
          className
        )}
        role='status'
      >
        <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
          Loading...
        </span>
      </div>
    </div>
  );
}

LoadingSpinner.propTypes = {
  className: PropTypes.string,
};

export default LoadingSpinner;
