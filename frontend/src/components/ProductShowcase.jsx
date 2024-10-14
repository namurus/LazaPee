<<<<<<< Updated upstream
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { stringToId } from '../helpers';
import SectionHeading from './SectionHeading';
import StarRating from './StarRating';
import LoadingSpinner from './LoadingSpinner';
=======
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { stringToId } from "../helpers";
import SectionHeading from "./SectionHeading";
import StarRating from "./StarRating";
import LoadingSpinner from "./LoadingSpinner";
import Button from "./Button";
>>>>>>> Stashed changes

ProductShowcase.propTypes = {
  showcaseTitle: PropTypes.string.isRequired,
};

function ProductShowcase({ showcaseTitle }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
<<<<<<< Updated upstream
      const response = await fetch('https://fakestoreapi.com/products?limit=4');
=======
      const response = await fetch("https://fakestoreapi.com/products?limit=4");
>>>>>>> Stashed changes
      try {
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        const json = await response.json();
        setCards(json);
        setLoading(false);
      } catch (error) {
<<<<<<< Updated upstream
        throw new Error('API Broken!' + error);
=======
        throw new Error("API Broken!" + error);
>>>>>>> Stashed changes
      }
    }
    fetchData();
  }, []);

  return (
<<<<<<< Updated upstream
    <div className='container mx-auto [&>*]:my-7 lg:[&>*]:lg:my-12'>
      <SectionHeading title={showcaseTitle} />
      <div className='grid auto-cols-[minmax(250px,1fr)] grid-flow-col gap-4 overflow-x-auto overflow-y-hidden sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8'>
        {loading ? (
          <LoadingSpinner />
        ) : (
          cards.map((card) => {
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
                    <div className='flex items-center gap-4'>
                      <StarRating rating={card.rating.rate} name={card.id} />
                      <p className='text-[0.75rem] font-light lg:text-sm'>
                        {card.rating.rate}/5
                      </p>
                    </div>
                    <div className='flex gap-3 text-xl font-semibold lg:text-2xl'>
                      <p>${card.price}</p>
                      <p className='line-through opacity-40'>
                        ${card.price * 1.2}
                      </p>
                      <div className='flex items-center justify-center rounded-xl bg-[#FF3333] bg-opacity-10 px-2 text-[0.625rem] text-[#FF3333] lg:px-4 lg:text-[0.75rem]'>
=======
    <div className="container mx-auto [&>*]:my-7 lg:[&>*]:lg:my-12">
      <SectionHeading title={showcaseTitle} />
      {loading && <LoadingSpinner />}
      <div className="grid auto-cols-[minmax(250px,1fr)] grid-flow-col gap-4 overflow-x-auto overflow-y-hidden sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {!loading &&
          cards.map((card) => {
            return (
              <Link to={`/product/details/${card.id}`} key={card.id}>
                <div className="flex h-full cursor-pointer flex-col transition-all hover:-translate-y-1 [&>*]:mb-4">
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={card.image}
                      className="aspect-square w-full overflow-hidden bg-[#F0EEED] object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex-1">
                      <h2 className="line-clamp-2 text-balance text-base font-semibold capitalize lg:text-xl">
                        {card.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-4">
                      <StarRating
                        rating={card.rating.rate}
                        name={`${card.id}`}
                      />
                      <p className="text-[0.75rem] font-light lg:text-sm">
                        {card.rating.rate}/5
                      </p>
                    </div>
                    <div className="flex gap-3 text-xl font-semibold lg:text-2xl">
                      <p>${card.price}</p>
                      <p className="line-through opacity-40">
                        ${card.price * 1.2}
                      </p>
                      <div className="flex items-center justify-center rounded-xl bg-[#FF3333] bg-opacity-10 px-2 text-[0.625rem] text-[#FF3333] lg:px-4 lg:text-[0.75rem]">
>>>>>>> Stashed changes
                        -20%
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
<<<<<<< Updated upstream
          })
        )}
      </div>
      <Link
        to={`/product/${stringToId(showcaseTitle)}`}
        className='flex w-full items-center justify-center rounded-full border-2 px-14 py-4 shadow-lg drop-shadow-lg transition-all hover:border-black hover:underline lg:mx-auto lg:w-max'
      >
        <button className='flex-1 text-nowrap capitalize lg:w-[100px] lg:flex-grow-0'>
          view all
        </button>
=======
          })}
      </div>
      <Link
        to={`/product/${stringToId(showcaseTitle)}`}
        className="flex w-full items-center justify-center rounded-full border-2 px-14 py-4 shadow-lg drop-shadow-lg transition-all hover:border-black hover:underline lg:mx-auto lg:w-max"
      >
        <Button
          style={"flex-1 text-nowrap capitalize lg:w-[100px] lg:flex-grow-0"}
        >
          view all
        </Button>
>>>>>>> Stashed changes
      </Link>
    </div>
  );
}

export default ProductShowcase;
