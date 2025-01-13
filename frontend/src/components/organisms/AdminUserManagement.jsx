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

const userData = [
  {
    id: 1,
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    avatar: 'https://via.placeholder.com/150',
    role: 'superadmin',
    updatedAt: '2024-12-25T12:00:00.000Z',
    createdAt: '2024-12-20T12:00:00.000Z',
    status: 'active',
  },
  {
    id: 2,
    fullName: 'Trần Thị B',
    email: 'tranthib@example.com',
    avatar: 'https://via.placeholder.com/150',
    role: 'admin',
    updatedAt: '2024-12-24T10:30:00.000Z',
    createdAt: '2024-12-15T14:20:00.000Z',
    status: 'active',
  },
  {
    id: 3,
    fullName: 'Lê Văn C',
    email: 'levanc@example.com',
    avatar: 'https://via.placeholder.com/150',
    role: 'user',
    updatedAt: '2024-12-23T08:45:00.000Z',
    createdAt: '2024-12-10T11:00:00.000Z',
    status: 'banned',
  },
];

function AdminUserManagement() {
  const [users, setUsers] = useState(userData);

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
            return <Badge variant="success">Siêu quản trị viên</Badge>;
          case 'admin':
            return <Badge variant="info">Quản trị viên</Badge>;
          case 'user':
            return <Badge variant="neutral">Người dùng</Badge>;
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
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <SidebarMaincontentLayout>
      <div className="flex flex-col space-y-6">
        <Tabs defaultValue="all">
          <TabsList className="mb-6 grid w-max grid-cols-3 gap-4">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="system">Hệ thống</TabsTrigger>
            <TabsTrigger value="banned">Bị cấm</TabsTrigger>
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
          <TabsContent value="banned">
            <DataTable
              columns={columns}
              data={users.filter((user) => user.status === 'banned')}
              searchColumn={'fullName'}
            />
          </TabsContent>
        </Tabs>
        <Link to="./new" className="self-end">
          <Button>
            Thêm người dùng mới <Plus />
          </Button>
        </Link>
      </div>
    </SidebarMaincontentLayout>
  );
}

export default AdminUserManagement;
