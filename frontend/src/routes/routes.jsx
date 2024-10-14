import { Navigate } from 'react-router-dom';
import App from '../App';
import { ErrorPage, HomePage } from '../pages';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';
import authRoutes from './authRoutes';

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
      ...userRoutes,
      ...productRoutes,
      {
        path: '/cart',
        element: <div>Cart element Placeholder</div>,
      },
      {
        path: '/checkout',
        element: <div>Checkout element Placeholder</div>,
      },
      ...authRoutes,
    ],
  },
];

export default routes;
