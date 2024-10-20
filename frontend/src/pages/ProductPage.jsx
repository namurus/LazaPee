import { useLoaderData, useSearchParams } from 'react-router-dom';
import {
  FaXmark,
  FaAngleRight,
  FaAngleDown,
  FaCheck,
  FaAngleLeft,
} from 'react-icons/fa6';
import { IoFilterSharp } from 'react-icons/io5';
import Breadcrumbs from '../components/Breadcrumbs';
import RangeSlider from '../components/RangeSlider';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ProductItem from '../components/ProductItem';

function ColorPicker({ colors, pickedColor, onPickColor }) {
  return (
    <div className='grid grid-cols-7 gap-2 md:grid-cols-5'>
      {colors.map((color) => (
        <button
          key={color}
          className='flex h-9 w-9 items-center justify-center rounded-full'
          style={{
            backgroundColor: color,
            border: `1px solid ${'#000000'}33`, // 33 is the hex for 20% opacity
          }}
          onClick={() => onPickColor(color)}
        >
          {pickedColor === color && <FaCheck className='w-1/2 text-white' />}
        </button>
      ))}
    </div>
  );
}

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  pickedColor: PropTypes.string,
  onPickColor: PropTypes.func,
};

function SizeList({ sizes, pickedSize, onPickSize }) {
  const defaultStyling =
    'flex items-center text-nowrap rounded-full bg-neutral px-5 py-3 font-light';

  return (
    <div className='flex flex-wrap gap-2 text-sm'>
      {sizes.map((size) => {
        return (
          <button
            key={size}
            onClick={() => {
              onPickSize(size);
            }}
            className={
              pickedSize === size
                ? twMerge(defaultStyling, 'bg-accent text-white')
                : defaultStyling
            }
          >
            <p>{size}</p>
          </button>
        );
      })}
    </div>
  );
}

SizeList.propTypes = {
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  pickedSize: PropTypes.string,
  onPickSize: PropTypes.func,
};

function CloseableFilter({ children, title }) {
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
          <FaAngleDown className='h-full opacity-40' />
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

CloseableFilter.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

function ProductPage() {
  const { products, categoryID, page, sortBy } = useLoaderData();
  const subCatagories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
  const [searchParams, setSearchParams] = useSearchParams({ page, sortBy });
  const [pickedColor, setPickedColor] = useState(null);
  const [pickedSize, setPickedSize] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 5000]);
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
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
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
        <div className='flex gap-5'>
          <div
            className={
              hideFilter
                ? 'hidden h-fit rounded-[1.25rem] border lg:block lg:max-w-[300px]'
                : 'fixed bottom-0 left-0 top-0 z-10 w-screen bg-black bg-opacity-20 md:block lg:max-w-[300px]'
            }
          >
            <div
              className={`transition-translate h-full w-full translate-y-20 overflow-auto rounded-t-3xl bg-white p-5 duration-300 lg:translate-y-0`}
            >
              <div className='line-below flex items-center justify-between pb-4 text-xl'>
                <h2 className='font-semibold'>Filter</h2>
                <div>
                  <FaXmark
                    className='h-full opacity-40 md:hidden'
                    onClick={() => setHideFilter(true)}
                  />
                </div>
              </div>
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
              <CloseableFilter title='Price'>
                <div>
                  <RangeSlider
                    rangeMin={0}
                    rangeMax={5000}
                    minGap={100}
                    onChange={setPriceRangeHandle}
                  />
                </div>
              </CloseableFilter>
              <CloseableFilter title='Color'>
                <ColorPicker
                  colors={[
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
                  ]}
                  pickedColor={pickedColor}
                  onPickColor={pickColorHandler}
                />
              </CloseableFilter>
              <CloseableFilter title='Size'>
                <SizeList
                  sizes={[
                    'XX-Small',
                    'X-Small',
                    'Small',
                    'Medium',
                    'Large',
                    'X-Large',
                    'XX-Large',
                  ]}
                  pickedSize={pickedSize}
                  onPickSize={pickSizeHandler}
                />
              </CloseableFilter>
            </div>
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
                      defaultValue={searchParams.get('sort')}
                      onChange={(e) => {
                        searchParams.set('sort', e.target.value);
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
                  <ProductItem key={product.id} product={product} />
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
                  setSearchParams(() => {
                    searchParams.set('page', newPage);
                    return searchParams;
                  });
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
                      setSearchParams(() => {
                        searchParams.set('page', i);
                        return searchParams;
                      });
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
                  setSearchParams(() => {
                    searchParams.set('page', newPage);
                    return searchParams;
                  });
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
