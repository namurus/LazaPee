import PropTypes from 'prop-types';

function ShopTitleSection({ children, title }) {
  return (
    <div className='w-full bg-white px-7 py-6 shadow-md'>
      <h1 className='font-display text-[2rem]'>{title}</h1>
      <div className='mt-4 space-y-4'>{children}</div>
    </div>
  );
}

ShopTitleSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default ShopTitleSection;
