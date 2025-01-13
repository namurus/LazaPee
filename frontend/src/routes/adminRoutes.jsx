//import { RoleBasedGuard } from '../guards/RoleBasedGuard';
import AdminPage from '../components/pages/AdminPage';
import AdminProductManagement from '../components/organisms/AdminProductManagement';
import AdminOrderManagement from '../components/organisms/AdminOrderManagement';
import AdminVoucherManagement from '../components/organisms/AdminVoucherManagement';
import AdminUserManagement from '../components/organisms/AdminUserManagement';
import AddVoucherForm from '../components/organisms/AddVoucherForm';
import UpdateVoucherForm from '../components/organisms/UpdateVoucherForm';

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
        element: <AddVoucherForm />,
        handle: {
          crumb: () => ({
            path: '/admin/voucher/new',
            name: 'Thêm mã giảm giá',
          }),
        },
      },
      {
        path: 'voucher/update/:id',
        element: <UpdateVoucherForm />,
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
