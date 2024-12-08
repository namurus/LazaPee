import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';
import { FaXmark } from 'react-icons/fa6';

function FilterSidebar({ children, className, onFilterButtonClick }) {
  return (
    <>
      <div
        className={twMerge(
          `h-full w-full overflow-auto rounded-t-3xl bg-white p-5 duration-300`,
          className
        )}
      >
        <div className='line-below flex items-center justify-between pb-4 text-xl'>
          <h2 className='font-semibold'>Filter</h2>
          <div>
            <FaXmark
              className='h-full opacity-40 md:hidden'
              onClick={onFilterButtonClick}
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

FilterSidebar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onFilterButtonClick: PropTypes.func,
};

export default FilterSidebar;
