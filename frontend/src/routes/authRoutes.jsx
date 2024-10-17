import { Navigate } from 'react-router-dom';
import { AuthGuard } from '../guards';
import GuestGuard from '../guards/GuestGuard';
import Login from '../pages/Login';

const authRoutes = [
  {
    path: '/auth',
    // element: <div>Auth element Placeholder</div>,
    element: <Navigate to="/auth/login" />,
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
      {
        path: '*',
        element: <Navigate to="/auth/login" />, // Chuyển hướng về login nếu không có route nào khác
      },
    ],
  },
];

export default authRoutes;
