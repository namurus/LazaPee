import { Navigate } from 'react-router-dom';
import { AuthGuard } from '../guards';
import GuestGuard from '../guards/GuestGuard';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const authRoutes = [
  {
    path: '/auth',
    // element: <Navigate to="signup" />,
    element: (
          <GuestGuard>
            <Signup />
          </GuestGuard>
        ),
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
            <Signup />
          </GuestGuard>
        ),
      },
      {
        path: 'logout',
        element: (
          <AuthGuard>
            <div>Logout element Placeholder</div>
          </AuthGuard>
        ),
      },
    ],
  },
];

export default authRoutes;
