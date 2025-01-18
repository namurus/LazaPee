import { Outlet, redirect } from 'react-router-dom';
import ProductPage from '../components/pages/ProductPage';
import { getCategoryProducts, getProduct } from '../api/admin/product';
import ProductDetail from '../components/pages/ProductDetail';
import AuthGuard from '../guards/AuthGuard';

async function categoryLoader({ params, request }) {
  const url = new URL(request.url);

  const subCategory = url.searchParams.get('subCat');
  const page = url.searchParams.get('page') || 1;
  const sortBy = url.searchParams.get('sortBy') || 'most-popular';

  if (!url.searchParams.get('page') || !url.searchParams.get('sortBy')) {
    url.searchParams.set('page', page);
    url.searchParams.set('sortBy', sortBy);

    return redirect(`${url.pathname}?${url.searchParams.toString()}`);
  }
  const products = await getCategoryProducts(params.categoryID, {
    page,
    limit: 6,
  });
  if (products === null) {
    return {
      products: [],
      subCategory,
      categoryName: products.category.name,
    };
  }
  return {
    products: products.products,
    subCategory,
    categoryName: products.category.name,
    currentPage: products.pagination.currentPage,
    totalPages: products.pagination.totalPages,
    totalProducts: products.pagination.totalProducts,
  };
}

async function productLoader({ params }) {
  const productID = params.productID;
  const product = await getProduct(productID);
  console.log(product);
  return product.data;
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
          crumb: (data) => [
            {
              name: data.categoryID,
              path: `/product/${data.categoryID}`,
            },
          ],
        },
      },
      {
        path: 'details/:productID',
        element: (
          <AuthGuard>
            <ProductDetail />
          </AuthGuard>
        ),
        loader: productLoader,
        handle: {
          // crumb: (data) => [data.categoryName, data.subCategory, data.name],
          crumb: (data) => [
            {
              name: data.category,
              path: `/product/${data.category}`,
            },
            {
              name: 'Đồ gia dụng',
              path: `/product/${data.category}`,
            },
            {
              name: data.title,
            },
          ],
        },
      },
    ],
  },
];

export default productRoutes;
