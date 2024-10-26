import { Outlet } from 'react-router-dom';
import ProductPage from '../components/pages/ProductPage';
import { getCategoryProducts, getProduct } from '../api/admin/product';
import ProductDetail from '../components/pages/ProductDetail';

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

async function productLoader({ params }) {
  const productID = params.productID;
  const product = await getProduct(productID);
  return product;
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
        handle: {
          crumb: (data) => [data.categoryID],
        },
      },
      {
        path: 'details/:productID',
        element: <ProductDetail />,
        loader: productLoader,
        handle: {
          // crumb: (data) => [data.categoryName, data.subCategory, data.name],
          crumb: (data) => [data.categoryName, 'Đồ gia dụng', data.name],
        },
      },
    ],
  },
];

export default productRoutes;
