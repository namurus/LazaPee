import { Outlet } from 'react-router-dom';
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
import Login from '../components/pages/Login';
import Logout from '../components/pages/Logout';
import Signup from '../components/pages/Signup';
import AdminLogin from '../components/pages/AdminLogin';
import AdminRegister from '../components/pages/AdminRegister';

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
            <Signup />
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
  {
    path: '/admin/auth',
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        path: 'login',
        element: (
            <AdminLogin />
        ),
      },
      {
        path: 'register',
        element: (
            <AdminRegister />
        ),
      },
    ]
  },
];

export default authRoutes;
