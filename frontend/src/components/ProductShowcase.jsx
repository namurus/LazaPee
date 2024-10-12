import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { stringToId } from '../helpers';

ProductShowcase.propTypes = {
  showcaseTitle: PropTypes.string.isRequired,
};

function ProductShowcase({ showcaseTitle }) {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://fakestoreapi.com/products?limit=6');
      try {
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        const json = await response.json();
        setCards(json);
      } catch (error) {
        throw new Error('API Broken!' + error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className='m-4 [&>*]:mb-7'>
      <h1 className='m-7 text-center font-display text-3xl font-bold uppercase'>
        {showcaseTitle}
      </h1>
      <div className='grid auto-cols-[minmax(250px,_1fr)] grid-flow-col gap-4 overflow-x-auto'>
        {cards.map((card) => {
          return (
            <div key={card.id} className='[&>*]:mb-4'>
              <div className='overflow-hidden rounded-2xl'>
                <img
                  src={card.image}
                  className='aspect-square w-full overflow-hidden bg-[#F0EEED] object-contain'
                />
              </div>
              <div>
                <h2 className='truncate text-nowrap text-base font-semibold'>
                  {card.title}
                </h2>
                <p className='text-[0.75rem] font-light'>
                  {card.rating.rate}/5
                </p>
                <div className='grid grid-cols-[1.5fr_1fr_1fr] gap-3 px-4 text-xl font-semibold'>
                  <p>${card.price}</p>
                  <p className='line-through opacity-40'>${card.price * 1.2}</p>
                  <div className='flex items-center justify-center rounded-xl bg-[#FF3333] bg-opacity-10 px-2 text-[0.625rem] text-[#FF3333]'>
                    -20%
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Link
        to={`/product/${stringToId(showcaseTitle)}`}
        className='flex w-full items-center justify-center rounded-full border-2 px-14 py-4'
      >
        <button className='flex-1'>View Product</button>
      </Link>
    </div>
  );
}

export default ProductShowcase;
