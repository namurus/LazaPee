import { Store, ShoppingBag, ShoppingCart } from 'lucide-react';

import SidebarLayout from './SidebarLayout';

// This is sample data.

function AdminSidebar({ ...props }) {
  const data = {
    navMain: [
      {
        title: 'Quản lý sản phẩm',
        url: 'product',
        icon: ShoppingCart,
        items: [
          {
            title: 'Danh sách sản phẩm',
            url: '#',
          },
        ],
      },
      {
        title: 'Quản lý mã giảm giá',
        url: 'voucher',
        icon: ShoppingBag,
        items: [
          {
            title: 'Danh sách mã giảm giá',
            url: '#',
            // isActive: true,
          },
        ],
      },
      {
        title: 'Quản lý đơn hàng',
        url: 'order',
        icon: Store,
        items: [
          {
            title: 'Danh sách đơn hàng',
            url: '#',
          },
        ],
      },
      {
        title: 'Quản lý người dùng',
        url: 'user',
        icon: Store,
        items: [
          {
            title: 'Danh sách người dùng',
            url: '#',
          },
        ],
      },
    ],
  };
  return <SidebarLayout data={data} {...props} />;
}

export default AdminSidebar;
