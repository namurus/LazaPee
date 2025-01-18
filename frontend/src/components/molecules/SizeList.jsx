import PropTypes from 'prop-types';
import { useState } from 'react';
import config from '../../config/config';

const sizes = Object.values(config.sizes);

function SizeList({ pickedSize, onPickSize, sizeList = sizes }) {
  const [pickSize, setPickSize] = useState(pickedSize);
  return (
    <div className='flex flex-wrap gap-2 text-sm'>
      {sizeList.map((size) => {
        return (
          <button
            key={size.value}
            type='button'
            onClick={() => {
              if (pickSize === size) {
                setPickSize(null);
                onPickSize(null);
                return;
              }
              onPickSize(size);
              setPickSize(size);
            }}
            className={`flex items-center text-nowrap rounded-full px-5 py-3 font-light ${pickSize === size ? 'bg-accent text-white' : 'bg-neutral text-black'}`}
          >
            <p>{size.text}</p>
          </button>
        );
      })}
    </div>
  );
}

SizeList.propTypes = {
  pickedSize: PropTypes.string,
  onPickSize: PropTypes.func,
  sizeList: PropTypes.array,
};

export default SizeList;
