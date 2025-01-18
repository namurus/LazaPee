import { redirect } from 'react-router-dom';
import { searchProducts } from '../api/admin/product';
import ProductPage from '../components/pages/ProductPage';

const searchLoader = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search');
  const page = url.searchParams.get('page') || 1;
  const sortBy = url.searchParams.get('sortBy') || 'most-popular';
  const priceMin = url.searchParams.get('priceMin');
  const priceMax = url.searchParams.get('priceMax');
  const color = url.searchParams.get('color');
  const size = url.searchParams.get('size');

  if (!url.searchParams.get('page') || !url.searchParams.get('sortBy')) {
    url.searchParams.set('page', page);
    url.searchParams.set('sortBy', sortBy);

    return redirect(`${url.pathname}?${url.searchParams.toString()}`);
  }

  const products = await searchProducts(search, {
    page: page - 1,
    limit: 6,
    minPrice: priceMin,
    maxPrice: priceMax,
    color,
    size,
  });
  console.log(products);
  if (products === null) {
    return {
      products: [],
      searchKeyWord: search,
      currentPage: 1,
      totalPages: 1,
      totalProducts: 0,
    };
  }

  return {
    products: products.data,
    searchKeyWord: search,
    currentPage: products.pagination.currentPage + 1,
    totalPages: products.pagination.totalPages,
    totalProducts: products.pagination.totalResults,
  };
};

const route = {
  path: '/search',
  element: <ProductPage />,
  loader: searchLoader,
  handle: {
    crumb: () => [
      {
        name: 'Search',
        path: '/search',
      },
    ],
  },
};

export { searchLoader, route };
