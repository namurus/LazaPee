const productRoutes = [
  {
    path: '/product',
    element: <div>Product element Placeholder</div>,
    children: [
      {
        path: ':categoryID',
        element: <div>Category element Placeholder</div>,
      },
      {
        path: 'details/:productID',
        element: <div>Product Details element Placeholder</div>,
        handle: {
          crumb: (data) => <span>{data.name}</span>,
        },
      },
    ],
  },
];

export default productRoutes;
