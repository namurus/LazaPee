import { Navigate } from 'react-router-dom';
import App from '../App';
import { ErrorPage, HomePage } from '../pages';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <Navigate to='/' />,
      },
      {
        path: '/shop',
        element: <div>Shop element Placeholder</div>,
      },
      {
        path: '/user',
        element: <div>User element Placeholder</div>,
        children: [
          {
            path: 'account',
            element: <div>Account element Placeholder</div>,
            children: [
              {
                path: 'profile',
                element: <div>Profile element Placeholder</div>,
              },
              {
                path: 'address',
                element: <div>Address element Placeholder</div>,
              },
            ],
          },
          {
            path: 'voucher',
            element: <div>Voucher Wallet element Placeholder</div>,
          },
          {
            path: 'orders',
            element: <div>Orders element Placeholder</div>,
          },
        ],
      },
      {
        path: '/product',
        element: <div>Product element Placeholder</div>,
        children: [
          {
            path: ':categoryID',
            element: <div>Category element Placeholder</div>,
          },
          {
            path: 'details/:productID',
            element: <div>Product Details element Placeholder</div>,
          },
        ],
      },
      {
        path: '/cart',
        element: <div>Cart element Placeholder</div>,
      },
      {
        path: '/checkout',
        element: <div>Checkout element Placeholder</div>,
      },
    ],
  },
];

export default routes;
