import AuthGuard from '../guards/AuthGuard';

const userRoutes = [
  {
    path: '/user',
    element: (
      <AuthGuard>
        <div>User element Placeholder</div>,
      </AuthGuard>
    ),
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
      {
        path: 'logout',
        element: <div>Logout element Placeholder</div>,
      },
    ],
  },
];

export default userRoutes;
