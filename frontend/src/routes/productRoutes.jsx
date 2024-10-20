import { Outlet } from 'react-router-dom';
import ProductPage from '../pages/ProductPage';
import { getCategoryProducts } from '../api/admin/product';

async function categoryLoader({ params, request }) {
  const url = new URL(request.url);

  const subCategory = url.searchParams.get('subCat');
  const page = url.searchParams.get('page') || 0;
  const sortBy = url.searchParams.get('sort') || 'most-popular';
  console.log(subCategory, page);
  const products = await getCategoryProducts(params.categoryID);

  return {
    products,
    subCategory,
    categoryID: params.categoryID,
    sortBy,
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
