import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';
import { FaXmark } from 'react-icons/fa6';
import { Drawer } from 'flowbite-react';

function FilterSidebar({
  children,
  className,
  isOpenDrawer,
  onFilterButtonClick,
}) {
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
      <Drawer
        open={isOpenDrawer}
        onClose={onFilterButtonClick}
        position='bottom'
      >
        <Drawer.Header title='Filters' />
        <Drawer.Items>{children}</Drawer.Items>
      </Drawer>
    </>
  );
}

FilterSidebar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isOpenDrawer: PropTypes.bool,
  onFilterButtonClick: PropTypes.func,
};

export default FilterSidebar;
