import App from '../App';
import ErrorPage from '../components/pages/ErrorPage';
import HomePage from '../components/pages/Homepage';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';
import authRoutes from './authRoutes';
import cartRoute from './cartRoute';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
import { rootAction, rootLoader } from './rootRoutes';
import shopRoutes from './shopRoutes';
import CheckoutPage from '../components/pages/CheckoutPage';
import ProductPage from '../components/pages/ProductPage';
import { searchLoader } from './searchRoutes';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      ...userRoutes,
      ...productRoutes,
      cartRoute,
      {
        path: '/checkout',
        element: (
          <AuthGuard>
            <CheckoutPage />
          </AuthGuard>
        ),
        handle: {
          crumb: () => ({
            path: '/checkout',
            name: 'Thanh toán',
          }),
        },
      },
      ...authRoutes,
      {
        path: 'admin',
        element: (
          <RoleBasedGuard role={['admin']}>
            <div>Admin element Placeholder</div>
          </RoleBasedGuard>
        ),
      },
      {
        path: 'search',
        element: <ProductPage />,
        loader: searchLoader,
      },
    ],
  },
  ...shopRoutes,
];

export default routes;
