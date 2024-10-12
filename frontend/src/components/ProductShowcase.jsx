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
      const response = await fetch('https://fakestoreapi.com/products?limit=4');
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
    <div className='m-4 [&>*]:my-7 lg:[&>*]:lg:my-12'>
      <h1 className='text-center font-display text-3xl font-bold uppercase lg:text-5xl'>
        {showcaseTitle}
      </h1>
      <div className='grid auto-cols-[minmax(250px,1fr)] grid-flow-col gap-4 overflow-x-auto sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8'>
        {cards.map((card) => {
          return (
            <Link to={`/product/${card.id}`} key={card.id}>
              <div className='flex h-full cursor-pointer flex-col transition-all hover:-translate-y-1 [&>*]:mb-4'>
                <div className='overflow-hidden rounded-2xl'>
                  <img
                    src={card.image}
                    className='aspect-square w-full overflow-hidden bg-[#F0EEED] object-contain'
                  />
                </div>
                <div className='flex flex-1 flex-col'>
                  <div className='flex-1'>
                    <h2 className='line-clamp-2 text-balance text-base font-semibold capitalize lg:text-xl'>
                      {card.title}
                    </h2>
                  </div>
                  <p className='text-[0.75rem] font-light lg:text-sm'>
                    {card.rating.rate}/5
                  </p>
                  <div className='flex gap-3 text-xl font-semibold lg:text-2xl'>
                    <p>${card.price}</p>
                    <p className='line-through opacity-40'>
                      ${card.price * 1.2}
                    </p>
                    <div className='flex items-center justify-center rounded-xl bg-[#FF3333] bg-opacity-10 px-2 text-[0.625rem] text-[#FF3333] lg:px-4 lg:text-[0.75rem]'>
                      -20%
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Link
        to={`/product/${stringToId(showcaseTitle)}`}
        className='flex w-full items-center justify-center rounded-full border-2 px-14 py-4 shadow-lg drop-shadow-lg transition-all hover:border-black hover:underline lg:mx-auto lg:w-max'
      >
        <button className='flex-1 text-nowrap capitalize lg:flex-grow-0'>
          view all
        </button>
      </Link>
    </div>
  );
}

export default ProductShowcase;
