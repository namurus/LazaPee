import AddProductForm from '../components/organisms/AddProductForm';
import OrderManagement from '../components/organisms/OrderManagement';
import ProductManagement from '../components/organisms/ProductManagement';
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
          formData.keys().forEach((key) => {
            console.log(key, formData.get(key));
          });
          return {};
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
        element: <ProductManagement />,
        handle: {
          crumb: () => ({
            path: '/shop/products',
            name: 'Quản lý sản phẩm',
          }),
        },
      },
      {
        path: 'orders',
        element: <OrderManagement />,
        handle: {
          crumb: () => ({
            path: '/shop/orders',
            name: 'Quản lý đơn hàng',
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
