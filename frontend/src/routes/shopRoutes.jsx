import { Outlet } from 'react-router-dom';
import AddProductForm from '../components/organisms/AddProductForm';
import OrderManagement from '../components/organisms/OrderManagement';
import ProductManagement from '../components/organisms/ProductManagement';
import ShopPage from '../components/pages/ShopPage';
import ShopProfile from '../components/organisms/ShopProfile';
import Statistic from '../components/organisms/Statistic';
import ShopGuard from '../guards/ShopGuard';
import { get } from '../api/config';
import AuthGuard from '../guards/AuthGuard';
const shopRoutes = [
  {
    path: 'shop',
    element: (
      <AuthGuard>
        <ShopGuard>
          <ShopPage />
        </ShopGuard>
      </AuthGuard>
    ),
    children: [
      {
        path: 'products/new',
        element: <AddProductForm />,
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
      {
        path: 'shop-management',
        element: <Outlet />,
        children: [
          {
            path: 'profile',
            element: <ShopProfile />,
            handle: {
              crumb: () => ({
                path: '/shop/shop-management/profile',
                name: 'Hồ sơ shop',
              }),
            },
          },
          {
            path: 'statistics',
            element: <Statistic />,
            handle: {
              crumb: () => ({
                path: '/shop/shop-management/statistics',
                name: 'Thống kê',
              }),
            },
          },
        ],
        handle: {
          crumb: () => ({
            path: '/shop/shop-management',
            name: 'Quản lý shop',
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
