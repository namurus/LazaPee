//import { RoleBasedGuard } from '../guards/RoleBasedGuard';
import AdminPage from '../components/pages/AdminPage';
import AdminProductManagement from '../components/organisms/AdminProductManagement';
import AdminOrderManagement from '../components/organisms/AdminOrderManagement';
import AdminVoucherManagement from '../components/organisms/AdminVoucherManagement';
import AdminUserManagement from '../components/organisms/AdminUserManagement';
import AdminAddVoucherForm from '../components/organisms/AdminAddVoucherForm';
import AdminUpdateVoucherForm from '../components/organisms/AdminUpdateVoucherForm';
import AdminUpdateProductForm from '../components/organisms/AdminUpdateProductForm';
import AdminReviewManagement from '../components/organisms/AdminReviewManagement';
import AdminViewOrderDetail from '../components/organisms/AdminViewOrderDetail';

const adminRoutes = [
  {
    path: 'admin',
    element: <AdminPage />,
    children: [
      {
        path: 'product',
        element: <AdminProductManagement />,
        handle: {
          crumb: () => ({
            path: '/admin/product',
            name: 'Quản lý sản phẩm',
          }),
        },
      },
      {
        path: 'product/update/:id',
        element: <AdminUpdateProductForm />,
        handle: {
          crumb: (id) => ({
          path: `/admin/product/update/${id}`,
          name: `Chỉnh sửa sản phẩm`,
          }),
        },
      },
      {
        path: 'voucher',
        element: <AdminVoucherManagement />,
        handle: {
          crumb: () => ({
            path: '/admin/voucher',
            name: 'Quản lý mã giảm giá',
          }),
        },
      },
      {
        path: 'voucher/new',
        element: <AdminAddVoucherForm />,
        handle: {
          crumb: () => ({
            path: '/admin/voucher/new',
            name: 'Thêm mã giảm giá',
          }),
        },
      },
      {
        path: 'voucher/update/:id',
        element: <AdminUpdateVoucherForm />,
        handle: {
          crumb: (id) => ({
            path: `/admin/voucher/update/${id}`,
            name: `Chỉnh sửa mã giảm giá`,
          }),
        },
      },
      {
        path: 'user',
        element: <AdminUserManagement />,
        handle: {
          crumb: () => ({
            path: '/admin/user',
            name: 'Quản lý người dùng',
          }),
        },
      },
      {
        path: 'order',
        element: <AdminOrderManagement />,
        handle: {
          crumb: () => ({
            path: '/admin/order',
            name: 'Quản lý đơn hàng',
          }),
        },
      },
      {
        path: 'order/detail/:id',
        element: <AdminViewOrderDetail />,
        handle: {
          crumb: (id) => ({
          path: `/admin/order/detail/${id}`,
          name: `Chi tiết đơn hàng`,
          }),
        },
      },
      {
        path: 'product/review',
        element: <AdminReviewManagement />,
        handle: {
          crumb: (id) => ({
            path: `/admin/product/review/${id}`,
            name: `Quản lý nhận xét`,
          }),
        },
      },
    ],
    handle: {
      crumb: () => ({
        path: '/admin',
        name: 'Admin',
        }),
    }
  },
];

export default adminRoutes;
