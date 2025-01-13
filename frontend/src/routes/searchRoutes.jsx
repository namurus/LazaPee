import { redirect } from 'react-router-dom';
import { searchProducts } from '../api/admin/product';

const searchLoader = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search');
  const page = url.searchParams.get('page') || 1;
  const sortBy = url.searchParams.get('sortBy') || 'most-popular';

  if (!url.searchParams.get('page') || !url.searchParams.get('sortBy')) {
    url.searchParams.set('page', page);
    url.searchParams.set('sortBy', sortBy);

    return redirect(`${url.pathname}?${url.searchParams.toString()}`);
  }

  const products = await searchProducts(search, {
    page,
    limit: 6,
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
    products: products.products,
    searchKeyWord: search,
    currentPage: products.pagination.currentPage,
    totalPages: products.pagination.totalPages,
    totalProducts: products.pagination.totalProducts,
  };
};

export { searchLoader };
