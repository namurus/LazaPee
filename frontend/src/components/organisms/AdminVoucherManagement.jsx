import DataTable from '../molecules/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';

import { Button } from '../ui/button';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

function AdminVoucherManagement() {
  const [vouchers, setVouchers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const token = localStorage.getItem('ADMIN_ACCESS_TOKEN');
        console.log(token);
        const response = await axios.get(
          'https://lazapee-jivl.onrender.com/admin/voucher',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log('Vouchers:', response);
        setVouchers(response.data);
      } catch (error) {
        console.error('Failed to fetch vouchers:', error);
      }
    };

    fetchVouchers();
  }, []);

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <span>{row.original.id}</span>,
    },
    {
      accessorKey: 'code',
      header: 'Mã giảm giá',
      cell: ({ row }) => <span>{row.original.code}</span>,
    },
    {
      accessorKey: 'endDate',
      header: 'Hiệu lực',
      cell: ({ row }) => {
        const now = new Date();
        const endDate = new Date(row.original.endDate);
        const diff = endDate - now;

        if (diff <= 0) return 'Hết hạn';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        if (days > 0) return `Còn ${days} ngày`;
        if (hours > 0) return `Còn ${hours} giờ`;
        return 'Còn 1 phút';
      },
    },
    {
      accessorKey: 'quantity',
      header: 'Giới hạn sử dụng',
    },
    {
      accessorKey: 'discount',
      header: 'Giá trị',
      cell: ({ row }) => {
        const discount = row.original.discount;
        //if (discount > 0 && discount <= 1) {
        return `${discount * 100}%`;
        //}
        // return CurrencyFormatter.formatWithLocaleInfo(discount, 'VND');
      },
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => {
        const now = new Date();
        const endDate = new Date(row.original.endDate);
        const diff = endDate - now;
        return diff > 0 ? (
          <Badge variant='success'>Đang hoạt động</Badge>
        ) : (
          <Badge variant='destructive'>Ngừng hoạt động</Badge>
        );
      },
    },
    {
      id: 'actions',
      header: 'Thao tác',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleUpdate(row.original.id)}>
              Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
              Xóa voucher
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('ADMIN_ACCESS_TOKEN');
      const response = await axios.delete(
        `https://lazapee-jivl.onrender.com/admin/voucher/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Delete voucher:', response);

      if (response.status === 204) {
        setVouchers((prev) => prev.filter((voucher) => voucher.id !== id));
        navigate('./');
      } else {
        console.error('Failed to delete voucher:', response.data);
      }
    } catch (error) {
      console.error('Error deleting voucher:', error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`./update/${id}`);
  };

  return (
    <SidebarMaincontentLayout>
      <div className='flex flex-col space-y-6'>
        <Tabs defaultValue='all'>
          <TabsList className='mb-6 grid w-max grid-cols-3 gap-4'>
            <TabsTrigger value='all'>Tất cả</TabsTrigger>
            <TabsTrigger value='pending'>Chờ duyệt</TabsTrigger>
            <TabsTrigger value='banned'>Bị cấm</TabsTrigger>
          </TabsList>
          <TabsContent value='all'>
            <DataTable
              columns={columns}
              data={vouchers}
              options={{
                search: {
                  allowSearch: true,
                  searchColumn: 'code',
                },
              }}
            />
          </TabsContent>
          <TabsContent value='pending'>
            <DataTable
              columns={columns}
              data={vouchers.filter((voucher) => voucher.status === 'pending')}
              options={{
                search: {
                  allowSearch: true,
                  searchColumn: 'code',
                },
              }}
            />
          </TabsContent>
          <TabsContent value='banned'>
            <DataTable
              columns={columns}
              data={vouchers.filter((voucher) => voucher.status === 'banned')}
              options={{
                search: {
                  allowSearch: true,
                  searchColumn: 'code',
                },
              }}
            />
          </TabsContent>
        </Tabs>
        <Link to='./new' className='self-end'>
          <Button>
            Thêm voucher mới <Plus />
          </Button>
        </Link>
      </div>
    </SidebarMaincontentLayout>
  );
}

export default AdminVoucherManagement;
