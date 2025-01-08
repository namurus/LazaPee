import PropTypes from 'prop-types';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function CloseableFilterSection({ children, title }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='line-below space-y-3 p-4 text-xl'>
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold'>{title}</h2>
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className='flex h-5 w-5 cursor-pointer items-center justify-center rounded-full transition-transform duration-150'
          style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}
        >
          <ChevronDown className='h-full opacity-40' />
        </div>
      </div>
      <div
        className={`overflow-hidden duration-150 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

CloseableFilterSection.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default CloseableFilterSection;
