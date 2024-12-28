import AddProductForm from '../components/organisms/AddProductForm';
import ShopPage from '../components/pages/ShopPage';
const shopRoutes = [
  {
    path: 'shop',
    element: <ShopPage />,
    children: [
      {
        path: 'products/new',
        element: <AddProductForm />,
        action: async ({ request }) => {
          let formData = await request.formData();
          console.log(formData);
        },
        handle: {
          crumb: () => ({
            path: '/shop/products/new',
            name: 'Thêm sản phẩm mới',
          }),
        },
      },
      {
        path: 'products',
        element: <div>Product placeholder</div>,
        handle: {
          crumbs: () => ({
            path: '/shop/products',
            name: 'Quản lý sản phẩm',
          }),
        },
      },
    ],
    handle: {
      crumb: () => ({
        path: '/shop',
        name: 'Trang người bán',
      }),
    },
  },
];

export default shopRoutes;
