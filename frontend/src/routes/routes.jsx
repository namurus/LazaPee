import { Link } from 'react-router-dom';
import App from '../App';
import { ErrorPage, HomePage } from '../pages';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';
import authRoutes from './authRoutes';
import cartRoute from './cartRoute';
import { AuthGuard } from '../guards';
import RoleBasedGuard from '../guards/RoleBasedGuard';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: '/shop',
            element: <div>Shop element Placeholder</div>,
            handle: {
              crumb: () => <Link to='/shop'>Shop</Link>,
            },
          },
          ...userRoutes,
          ...productRoutes,
          cartRoute,
          {
            path: '/checkout',
            element: (
              <AuthGuard>
                <div>Checkout element Placeholder</div>
              </AuthGuard>
            ),
          },
          ...authRoutes,
        ],
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <AuthGuard>
        <RoleBasedGuard allowedRoles={['admin']}>
          <div>Admin element Placeholder</div>
        </RoleBasedGuard>
      </AuthGuard>
    ),
  },
];

export default routes;
