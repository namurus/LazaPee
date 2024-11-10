import { Outlet } from 'react-router-dom';
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
import Login from '../components/pages/Login';
import Logout from '../components/pages/Logout';

const authRoutes = [
  {
    path: '/auth',
    element: (
      <>
        <Outlet />
      </>
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
            <div>Signup element Placeholder</div>
          </GuestGuard>
        ),
      },
      {
        path: 'logout',
        element: (
          <AuthGuard>
            <Logout />
          </AuthGuard>
        ),
      },
    ],
  },
];

export default authRoutes;
