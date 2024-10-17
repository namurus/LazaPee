import { AuthGuard } from '../guards';
import GuestGuard from '../guards/GuestGuard';
import Login from '../pages/Login';

const authRoutes = [
  {
    path: '/auth',
    element: <div>Auth element Placeholder</div>,
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
      {
        path: 'signup',
        element: (
          <GuestGuard>
            <div>Signup element Placeholder</div>
          </GuestGuard>
        ),
      },
      {
        path: 'logout',
        element: (
          <AuthGuard>
            <div>Logout element Placeholder</div>,
          </AuthGuard>
        ),
      },
    ],
  },
];

export default authRoutes;
