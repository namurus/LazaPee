import { Store, ShoppingBag, ShoppingCart } from 'lucide-react';

import SidebarLayout from './SidebarLayout';

// This is sample data.

function ShopSidebar({ ...props }) {
  const data = {
    navMain: [
      {
        title: 'Quản lý đơn hàng',
        url: 'orders',
        icon: ShoppingCart,
        items: [
          {
            title: 'Danh sách đơn hàng',
            url: '#',
          },
        ],
      },
      {
        title: 'Quản lý sản phẩm',
        url: 'products',
        icon: ShoppingBag,
        items: [
          {
            title: 'Danh sách sản phẩm',
            url: '#',
            isActive: true,
          },
          {
            title: 'Thêm sản phẩm mới',
            url: 'new',
          },
        ],
      },
      {
        title: 'Quản lý shop',
        url: 'shop-management',
        icon: Store,
        items: [
          {
            title: 'Hồ sơ shop',
            url: 'profile',
          },
          {
            title: 'Shop Decoration',
            url: 'decoration',
          },
          {
            title: 'Thống kê',
            url: 'statistics',
          },
        ],
      },
    ],
  };
  return <SidebarLayout data={data} {...props} />;
}

export default ShopSidebar;
