import PropTypes from 'prop-types';

NoItemListNotification.propTypes = {
  message: PropTypes.string.isRequired,
};

function NoItemListNotification({ message }) {
  return (
    <div className='col-span-10 flex min-h-96 flex-col items-center justify-center'>
      <h2 className='text-xl font-semibold'>No Item Found</h2>
      <p className='text-sm font-light text-opacity-60'>{message}</p>
    </div>
  );
}

export default NoItemListNotification;
