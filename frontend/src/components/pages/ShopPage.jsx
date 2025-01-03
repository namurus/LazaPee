import ShopSidebar from '../organisms/ShopSidebar';
import { SidebarProvider } from '../ui/sidebar';

import { Outlet } from 'react-router-dom';
function ShopPage() {
  return (
    <div>
      <SidebarProvider>
        <ShopSidebar />
        <Outlet />
      </SidebarProvider>
    </div>
  );
}

export default ShopPage;
