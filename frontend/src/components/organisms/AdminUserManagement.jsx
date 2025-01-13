import DataTable from '../molecules/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';

import { Button } from '../ui/button';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import axios from 'axios';

function AdminUserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('ADMIN_ACCESS_TOKEN');
        const response = await axios.get('https://lazapee-jivl.onrender.com/admin/user?perPage=10&page=1', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Users:', response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      accessorKey: 'fullName',
      header: 'Tên người dùng',
      cell: ({ row }) => (
        <div className="flex items-center space-x-4">
          <img
            src={row.original.avatar}
            alt={row.original.fullName}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{row.original.fullName}</p>
            <p className="text-sm text-gray-500">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Vai trò',
      cell: ({ row }) => {
        switch (row.original.role) {
          case 'superadmin':
            return <Badge variant="success">Quản trị viên</Badge>;
          case 'admin':
            return <Badge variant="success">Quản trị viên</Badge>;
          case 'seller':
            return <Badge variant="success">Người bán hàng</Badge>;
          case 'customer':
            return <Badge variant="success">Người dùng</Badge>;
        }
      },
    },
    {
      accessorKey: 'permissions',
      header: 'Quyền',
      cell: () => {
        return (
            <p
              className='cursor-pointer text-blue-600'
            >
            Xem quyền
            </p>
          );
      }
    },
    {
      accessorKey: 'updatedAt',
      header: 'Hoạt động gần nhất',
      cell: ({ row }) => {
        const date = new Date(row.original.updatedAt);
        return date.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Ngày thêm vào',
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return date.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      },
    },
    {
      id: 'actions',
      header: 'Thao tác',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
              Xóa người dùng
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleDelete = (id) => {
    // setUsers((prev) => prev.filter((user) => user.id !== id));
    // del/admin/user/:id
    try {
      const token = localStorage.getItem('ADMIN_ACCESS_TOKEN');
      axios.delete(`https://lazapee-jivl.onrender.com/admin/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
    catch (error) {
      console.error('Failed to delete user:', error);
    }

  };

  return (
    <SidebarMaincontentLayout>
      <div className="flex flex-col space-y-6">
        <Tabs defaultValue="all">
          <TabsList className="mb-6 grid w-max grid-cols-4 gap-4">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="system">Hệ thống</TabsTrigger>
            <TabsTrigger value="seller">Người bán hàng</TabsTrigger>
            <TabsTrigger value="customer">Người dùng</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <DataTable
              columns={columns}
              data={users}
              searchColumn={'fullName'}
            />
          </TabsContent>
          <TabsContent value="system">
            <DataTable
              columns={columns}
              data={users.filter(
                (user) =>
                  user.role === 'superadmin' || user.role === 'admin'
              )}
              searchColumn={'fullName'}
            />
          </TabsContent>
          <TabsContent value="seller">
            <DataTable
              columns={columns}
              data={users.filter((user) => user.role === 'seller')}
              searchColumn={'fullName'}
            />
          </TabsContent>
          <TabsContent value="customer">
            <DataTable
              columns={columns}
              data={users.filter((user) => user.role === 'customer')}
              searchColumn={'fullName'}
            />
          </TabsContent>
        </Tabs>
      </div>
    </SidebarMaincontentLayout>
  );
}

export default AdminUserManagement;
