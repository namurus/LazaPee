const authRoutes = [
  {
    path: '/auth',
    element: <div>Auth element Placeholder</div>,
    children: [
      {
        path: 'login',
        element: <div>Login element Placeholder</div>,
      },
      {
        path: 'signup',
        element: <div>Signup element Placeholder</div>,
      },
      {
        path: 'logout',
        element: <div>Logout element Placeholder</div>,
      },
    ],
  },
];

export default authRoutes;
