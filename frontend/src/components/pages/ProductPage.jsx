import { useLoaderData, useSearchParams } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa6';
import RangeSlider from '../molecules/RangeSlider';
import { useState } from 'react';
import CloseableFilterSection from '../molecules/CloseableFilterSection';
import SizeList from '../molecules/SizeList';
import ColorPicker from '../molecules/ColorPicker';

import FilterSidebar from '../organisms/FilterSidebar';
import ProductListPanel from '../organisms/ProductListPanel';
import MainLayout from '../templates/MainLayout';
import InverseButton from '../atoms/InverseButton';

const config = {
  priceRange: {
    min: 0,
    max: 50000,
    priceGap: 100,
  },
  colors: [
    '#38BE40',
    '#EF0000',
    '#F5D936',
    '#F17516',
    '#2ECCF3',
    '#004EF0',
    '#7435EF',
    '#EE1B9F',
    '#FFFFFF',
    '#000000',
  ],
  sizes: [
    'XX-Small',
    'X-Small',
    'Small',
    'Medium',
    'Large',
    'X-Large',
    'XX-Large',
  ],
};

function ProductPage() {
  const { products, categoryID } = useLoaderData();
  const subCatagories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];

  const [searchParams, setSearchParams] = useSearchParams();
  const [pickedColor, setPickedColor] = useState(null);
  const [pickedSize, setPickedSize] = useState(null);
  const [priceRange, setPriceRange] = useState([
    config.priceRange.min,
    config.priceRange.max,
  ]);
  const [sortBy, setSortBy] = useState('newest');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const page = parseInt(searchParams.get('page')) || 0;

  const maxPage = products.length / 9 < 1 ? 1 : Math.ceil(products.length / 9);

  const pickColorHandler = (color) => {
    if (color === pickedColor) {
      setPickedColor(null);
      return;
    }
    setPickedColor(color);
  };

  const pickSizeHandler = (size) => {
    if (size === pickedSize) {
      setPickedSize(null);
      return;
    }
    setPickedSize(size);
  };

  const setPriceRangeHandler = (min, max) => {
    setPriceRange([min, max]);
  };

  const pageChangeHandler = (page) => {
    searchParams.set('page', page);
    setSearchParams(searchParams);
  };

  const onFilterButtonClick = () => {
    searchParams.set('color', pickedColor);
    searchParams.set('size', pickedSize);
    searchParams.set('priceMin', priceRange[0]);
    searchParams.set('priceMax', priceRange[1]);
    searchParams.set('sortBy', sortBy);
    setSearchParams(searchParams);
  };

  const handleFilterIconClick = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  return (
    <MainLayout>
      <div className='mt-6 flex gap-5'>
        <div>
          <FilterSidebar
            className='hidden h-fit rounded-[1.25rem] border lg:block lg:max-w-[300px]'
            isOpenDrawer={isOpenDrawer}
            onFilterButtonClick={handleFilterIconClick}
          >
            <div className='line-below grid gap-5 pb-6 pt-5 text-base'>
              {subCatagories.map((subCategory) => (
                <button
                  key={subCategory}
                  onClick={() => {
                    const newSubCategory = subCategory.toLowerCase();
                    searchParams.set('subCat', newSubCategory);
                    setSearchParams(searchParams);
                  }}
                  className='flex w-full items-center font-light opacity-60'
                >
                  <p>{subCategory}</p>
                  <FaAngleRight className='ml-auto' />
                </button>
              ))}
            </div>
            <CloseableFilterSection title='Price'>
              <div>
                <RangeSlider
                  rangeMin={config.priceRange.min}
                  rangeMax={config.priceRange.max}
                  minGap={config.priceRange.priceGap}
                  onChange={setPriceRangeHandler}
                />
              </div>
            </CloseableFilterSection>
            <CloseableFilterSection title='Color'>
              <ColorPicker
                colors={config.colors}
                pickedColor={pickedColor}
                onPickColor={pickColorHandler}
              />
            </CloseableFilterSection>
            <CloseableFilterSection title='Size'>
              <SizeList
                sizes={config.sizes}
                pickedSize={pickedSize}
                onPickSize={pickSizeHandler}
              />
            </CloseableFilterSection>
            <div className='mt-6 flex justify-center'>
              <InverseButton
                switchColor={true}
                style='rounded-full px-4 py-3 bg-black text-white hover:text-black hover:bg-white outline-black'
                onClick={onFilterButtonClick}
              >
                Apply
              </InverseButton>
            </div>
          </FilterSidebar>
        </div>
        <ProductListPanel
          products={products}
          currentPage={page}
          totalPages={maxPage}
          listTitle={categoryID}
          sortByOptions={[
            { label: 'Newest', value: 'newest' },
            { label: 'Popular', value: 'popular' },
            { label: 'Price: Low to High', value: 'low' },
            { label: 'Price: High to Low', value: 'high' },
          ]}
          sortByDefaultValue={sortBy}
          onSortByChange={(value) => {
            setSortBy(value);
          }}
          onFilterIconClick={handleFilterIconClick}
          onPageChange={pageChangeHandler}
        />
      </div>
    </MainLayout>
  );
}

export default ProductPage;
