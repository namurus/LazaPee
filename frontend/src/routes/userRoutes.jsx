import AuthGuard from '../guards/AuthGuard';
import Profile from '../components/pages/Profile';
import { Outlet } from 'react-router-dom';
import Address from '../components/organisms/Address';
import ChangePassword from '../components/organisms/ChangePassword';
import ProfileInfo from '../components/organisms/ProfileInfo';

const userRoutes = [
  {
    path: '/user',
    element: (
      <AuthGuard>
        <Outlet />
      </AuthGuard>
    ),
    children: [
      {
        path: 'account',
        element: (
            <Profile />
        ),
        children: [
          {
            path: 'profile',
            element: <ProfileInfo />
          },
          {
            path: 'address',
            element: <Address />,
          },
          {
            path: 'change-password',
            element: <ChangePassword />,
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
      {
        path: 'logout',
        element: <div>Logout element Placeholder</div>,
      },
    ],
  },
];

export default userRoutes;
