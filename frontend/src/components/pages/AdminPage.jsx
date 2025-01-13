import AdminSidebar from '../organisms/AdminSideBar';
import { SidebarProvider } from '../ui/sidebar';

import { Outlet } from 'react-router-dom';
function AdminPage() {
  return (
    <div>
      <SidebarProvider>
        <AdminSidebar />
            <Outlet />
      </SidebarProvider>
    </div>
  );
}

export default AdminPage;
