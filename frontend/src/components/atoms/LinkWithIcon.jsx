import PropTypes from 'prop-types';

LinkWithIcon.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

function LinkWithIcon({ href, icon }) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className='inline-block h-7 w-7 rounded-full border-1 border-black border-opacity-20 p-1 text-black transition-colors focus-within:bg-black focus-within:text-white hover:bg-black hover:text-white'
    >
      {icon}
    </a>
  );
}

export default LinkWithIcon;
