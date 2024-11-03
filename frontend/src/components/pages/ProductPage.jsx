import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import { IoFilterSharp } from 'react-icons/io5';
import Breadcrumbs from '../molecules/Breadcrumbs';
import RangeSlider from '../molecules/RangeSlider';
import { useEffect, useState } from 'react';
import ProductItem from '../molecules/ProductItem';
import CloseableFilterSection from '../molecules/CloseableFilterSection';
import SizeList from '../molecules/SizeList';
import ColorPicker from '../molecules/ColorPicker';

import FilterSidebar from '../organisms/FilterSidebar';

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

  const page = searchParams.get('page') || 0;

  const [hideFilter, setHideFilter] = useState(true);
  const [filterList, setFilterList] = useState([]);
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

  const setPriceRangeHandle = (min, max) => {
    setPriceRange([min, max]);
  };

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      if (pickedColor && product.color !== pickedColor) {
        return false;
      }
      if (pickedSize && !product.size?.includes(pickedSize)) {
        return false;
      }
      if (
        product.price * 25 < priceRange[0] ||
        product.price * 25 > priceRange[1]
      ) {
        return false;
      }
      return true;
    });

    setFilterList(filteredProducts);
  }, [pickedColor, pickedSize, products, priceRange]);

  return (
    <>
      <div className='container mx-auto'>
        <Breadcrumbs />
        <div className='mt-6 flex gap-5'>
          <div
            className={
              hideFilter
                ? 'hidden h-fit rounded-[1.25rem] border lg:block lg:max-w-[300px]'
                : 'fixed bottom-0 left-0 top-0 z-10 w-screen bg-black bg-opacity-20 md:block lg:max-w-[300px]'
            }
          >
            <FilterSidebar>
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
                    onChange={setPriceRangeHandle}
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
            </FilterSidebar>
          </div>
          <div className='flex-1'>
            <div className='md:flex md:justify-between'>
              <h1 className='text-[2rem] font-semibold capitalize'>
                {categoryID}
              </h1>
              <div className='flex items-center gap-3 text-sm font-light text-opacity-60'>
                <p>
                  Showing {page + 1}-{maxPage} of {products.length} Products
                </p>
                <div
                  className={
                    hideFilter
                      ? 'ml-auto w-fit rounded-full bg-neutral p-2 md:hidden'
                      : 'hidden'
                  }
                >
                  <IoFilterSharp
                    className='h-4 w-4'
                    onClick={() => setHideFilter(false)}
                  />
                </div>
                <div className='hidden md:block'>
                  Sort by:
                  {
                    <select
                      className='ml-2 cursor-pointer px-2 py-1 font-normal *:capitalize'
                      defaultValue={searchParams.get('sortBy')}
                      onChange={(e) => {
                        searchParams.set('sortBy', e.target.value);
                        setSearchParams(searchParams);
                      }}
                    >
                      <option value='most-popular'>Most Popular</option>
                      <option value='new-arrivals'>New arrivals</option>
                    </select>
                  }
                </div>
              </div>
            </div>
            <div className='line-below grid grid-cols-2 gap-[0.875rem] py-4 md:grid-cols-3 md:gap-5 md:p-4 lg:grid-cols-4 lg:gap-9'>
              {filterList.length !== 0 ? (
                filterList.map((product) => (
                  <Link to={`/product/details/${product.id}`} key={product.id}>
                    <ProductItem product={product} />
                  </Link>
                ))
              ) : (
                <div className='col-span-10 flex min-h-96 flex-col items-center justify-center'>
                  <h2 className='text-xl font-semibold'>No Products Found</h2>
                  <p className='text-sm font-light text-opacity-60'>
                    Try changing the filters
                  </p>
                </div>
              )}
            </div>
            <div className='flex py-4'>
              <button
                className='flex items-center rounded-lg border px-[0.875rem] py-2'
                onClick={() => {
                  const newPage = Math.max(page - 1, 0);
                  searchParams.set('page', newPage);
                  setSearchParams(searchParams);
                }}
              >
                <FaAngleLeft className='mr-2' />
                Previous
              </button>
              <div className='flex flex-1 justify-evenly'>
                {Array.from({ length: maxPage }, (_, i) => (
                  <button
                    key={i}
                    className={`aspect-square rounded-lg p-3 text-center leading-none ${page === i ? 'bg-neutral' : ''}`}
                    onClick={() => {
                      searchParams.set('page', i);
                      setSearchParams(searchParams);
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                className='flex items-center rounded-lg border px-[0.875rem] py-2'
                onClick={() => {
                  const newPage = Math.min(page + 1, maxPage - 1);
                  searchParams.set('page', newPage);
                  setSearchParams(searchParams);
                }}
              >
                Next
                <FaAngleRight className='ml-2' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
