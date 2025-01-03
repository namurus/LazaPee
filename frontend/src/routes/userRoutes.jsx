import AuthGuard from '../guards/AuthGuard';
import Profile from '../components/pages/Profile';

const userRoutes = [
  {
    path: '/user',
    element: (
      <Profile />
    ),
    children: [
      {
        path: 'account',
        element: <div>Account element Placeholder</div>,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: 'profile',
            elenment: (
              <AuthGuard>
                <Profile />
              </AuthGuard>
            )
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
      {
        path: 'logout',
        element: <div>Logout element Placeholder</div>,
      },
    ],
  },
];

export default userRoutes;
