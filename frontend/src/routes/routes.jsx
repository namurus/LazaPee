import App from '../App';
import ErrorPage from '../components/pages/ErrorPage';
import HomePage from '../components/pages/Homepage';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';
import authRoutes from './authRoutes';
import cartRoute from './cartRoute';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
import { rootAction, rootLoader } from './rootRoutes';
import shopRoutes from './shopRoutes';
import adminRoutes from './adminRoutes';
import CheckoutPage from '../components/pages/CheckoutPage';
import QRPage from '../components/pages/QRPage';
import { route as searchRoute } from './searchRoutes';

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
      searchRoute,
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
      {
        path: '/qr_payment',
        element: (
          <AuthGuard>
            <QRPage />
          </AuthGuard>
        ),
      },
      ...authRoutes,
      // {
      //   path: 'admin',
      //   element: (
      //     // <RoleBasedGuard roles={['admin']}>
      //     //   <div>Admin element Placeholder</div>
      //     // </RoleBasedGuard>
      //     []
      //   ),
      // },
    ],
  },
  ...shopRoutes,
  ...adminRoutes,
];

export default routes;
