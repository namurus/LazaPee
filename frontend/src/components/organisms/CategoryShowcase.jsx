import SectionHeading from '../atoms/SectionHeading';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { stringToId } from '../../helpers';
import { getCategories } from '../../api/admin/product';
import Image from '../atoms/Image';

function CategoryCard({ category }) {
  return (
    <div className='relative cursor-pointer items-center justify-center transition-all hover:-translate-y-1'>
      <div className='overflow-hidden rounded-[1.25rem]'>
        <Image
          src={category.image}
          alt={category.name}
          className='max-h-48 w-full bg-white object-contain object-right lg:max-h-[18rem]'
        />
      </div>
      <h2 className='absolute left-0 top-0 text-balance px-6 py-3 text-2xl font-semibold capitalize lg:px-9 lg:py-6 lg:text-4xl'>
        {category.name}
      </h2>
    </div>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.object.isRequired,
};

function CategoryShowcase() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const imageResponse = await fetch(
        'https://via.assets.so/shoe.png?id=1&q=95&fit=fill'
      );
      try {
        if (!imageResponse.ok) {
          throw new Error(`${imageResponse.status}`);
        }
        const json = await getCategories();
        if (!json) {
          throw new Error('No categories found');
        }
        const objectData = json.slice(0, 4).map((category) => {
          return {
            name: category,
            image: imageResponse.url,
          };
        });
        setCategories(objectData);
      } catch (error) {
        console.log('Error fetching categories:', error);
        setCategories([]);
      }
    }
    fetchData();
  }, []);
  return (
    <section>
      <div className='rounded-[1.25rem] bg-[#F0F0F0] p-6 lg:container lg:mx-auto lg:rounded-[3rem] lg:p-16'>
        <div className='mb-7 mt-4 lg:m-12'>
          <SectionHeading title='BROWSE BY category' />
        </div>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2 lg:[&>*:nth-child(2)]:col-span-2 lg:[&>*:nth-child(3)]:col-span-2'>
          {categories.map((category) => {
            return (
              <Link
                to={`/product/${stringToId(category.name)}`}
                key={category.name}
              >
                <CategoryCard category={category} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CategoryShowcase;
