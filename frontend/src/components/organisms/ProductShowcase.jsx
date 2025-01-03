import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { stringToId } from '../../helpers';
import SectionHeading from '../atoms/SectionHeading';
import LoadingSpinner from '../atoms/LoadingSpinner';
import ProductItem from '../molecules/ProductItem';
import { getProductsWithLimit } from '../../api/admin/product';

ProductShowcase.propTypes = {
  showcaseTitle: PropTypes.string.isRequired,
};

function ProductShowcase({ showcaseTitle }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const json = await getProductsWithLimit(4);
      const data = json.data;
      if (data.length > 4) {
        setCards(data.slice(0, 4));
      } else {
        setCards(json.data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className='container mx-auto [&>*]:my-7 lg:[&>*]:lg:my-12'>
      <SectionHeading title={showcaseTitle} />
      {loading && <LoadingSpinner />}
      <div className='grid auto-cols-[minmax(250px,1fr)] grid-flow-col gap-4 overflow-x-auto overflow-y-hidden sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8'>
        {!loading &&
          cards.map((card) => {
            return (
              <Link to={`/product/details/${card.id}`} key={card.id}>
                <ProductItem product={card} />
              </Link>
            );
          })}
      </div>
      <Link
        to={`/product/${stringToId(showcaseTitle)}`}
        className='flex w-full items-center justify-center rounded-full border-2 px-14 py-4 shadow-lg drop-shadow-lg transition-all hover:border-black hover:underline lg:mx-auto lg:w-max'
      >
        <button
          className={
            'flex-1 text-nowrap capitalize lg:w-[100px] lg:flex-grow-0'
          }
        >
          view all
        </button>
      </Link>
    </div>
  );
}

export default ProductShowcase;
