import PropTypes from 'prop-types';

function AddressTag({ addressInfo }) {
  return (
    <div className='w-full rounded-sm bg-neutral-300 px-6 py-4'>
      <p>
        <strong>{addressInfo.user.name}</strong> | {addressInfo.user.number}
      </p>
      <p>{addressInfo.address}</p>
    </div>
  );
}
AddressTag.propTypes = {
  addressInfo: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddressTag;
