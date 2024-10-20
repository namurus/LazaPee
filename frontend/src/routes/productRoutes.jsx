import { Outlet } from 'react-router-dom';
import ProductPage from '../pages/ProductPage';
import { getCategoryProducts } from '../api/admin/product';

async function categoryLoader({ params, request }) {
  const url = new URL(request.url);

  const subCategory = url.searchParams.get('subCategory');
  const color = url.searchParams.get('color');
  const size = url.searchParams.get('size');
  const page = url.searchParams.get('page') || 0;
  console.log(subCategory, color, size, page);
  const products = await getCategoryProducts(params.categoryID);

  return {
    products,
    subCategory,
    color,
    size,
    categoryID: params.categoryID,
    maxPage: products.length / 9 < 1 ? 1 : Math.ceil(products.length / 9),
    page: 0,
  };
}

const productRoutes = [
  {
    path: '/product',
    element: (
      <div>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: ':categoryID',
        element: <ProductPage />,
        loader: categoryLoader,
      },
      {
        path: 'details/:productID',
        element: <div>Product Details element Placeholder</div>,
        handle: {
          crumb: (data) => <span>{data.name}</span>,
        },
      },
    ],
  },
];

export default productRoutes;
