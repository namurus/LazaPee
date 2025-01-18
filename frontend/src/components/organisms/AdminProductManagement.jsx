import DataTable from '../molecules/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';

import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import CurrencyFormatter from '../../helpers/CurrencyFormatter';
import axios from 'axios';

function AdminProductManagement() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('ADMIN_ACCESS_TOKEN');
      const response = await axios.get(
        'https://lazapee-jivl.onrender.com/admin/product',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(response.data.products);
      console.log('Products:', response.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const columns = [
    {
      accessorKey: 'thumbnail',
      header: 'Sản phẩm',
      cell: ({ row }) => (
        <img
          src={row.original.thumbnail}
          alt={row.original.productName}
          className='h-16 w-16 rounded-md object-cover'
        />
      ),
    },
    {
      accessorKey: 'productName',
      header: 'Tên sản phẩm',
      cell: ({ row }) => (
        <div className='space-y-1'>
          <p className='font-medium'>{row.original.productName}</p>
          <p className='text-sm text-gray-500'>{row.original.category.name}</p>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'SKU',
      cell: ({ row }) => {
        const skus = row.original.skus;
        return (
          <div className='space-y-1'>
            {skus.map((sku, index) => (
              <div key={index} className='flex gap-2'>
                <p>{sku.color}</p>
                <p>{sku.size}</p>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: 'skus',
      header: 'Giá',
      cell: ({ row }) => {
        const skus = row.original.skus;
        return (
          <div className='space-y-1'>
            {skus.map((sku, index) => (
              <div key={index} className='flex gap-2'>
                <p>
                  {CurrencyFormatter.formatWithLocaleInfo(sku.price, 'VND')}
                </p>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: 'stock',
      header: 'Kho hàng',
      cell: ({ row }) => {
        const skus = row.original.skus;
        return (
          <div className='space-y-1'>
            {skus.map((sku, index) => (
              <div key={index} className='flex gap-2'>
                <p>{sku.stock_quantity}</p>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => {
        const status = row.original.status;
        switch (status) {
          case 'available':
            return <Badge variant='success'>Có sẵn</Badge>;
          case 'out of stock':
            return <Badge variant='destructive'>Hết hàng</Badge>;
          case 'active':
            return <Badge variant='success'>Đang hoạt động</Badge>;
          case 'inactive':
            return <Badge variant='destructive'>Ngưng hoạt động</Badge>;
        }
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
            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
              Xóa sản phẩm
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('ADMIN_ACCESS_TOKEN');
      await axios.delete(
        `https://lazapee-jivl.onrender.com/admin/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Xóa sản phẩm thành công');
      fetchData(); // Cập nhật danh sách sau khi xóa
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Có lỗi xảy ra khi xóa sản phẩm');
    }
  };

  return (
    <SidebarMaincontentLayout>
      <div className='flex flex-col space-y-6'>
        <Tabs defaultValue='all'>
          <TabsList className='mb-6 grid w-max grid-cols-5 gap-4' onChan>
            <TabsTrigger value='all'>Tất cả</TabsTrigger>
            <TabsTrigger value='available'>Có sẵn</TabsTrigger>
            <TabsTrigger value='out of stock'>Hết hàng</TabsTrigger>
            <TabsTrigger value='active'>Đang hoạt động</TabsTrigger>
            <TabsTrigger value='inactive'>Ngưng hoạt động</TabsTrigger>
          </TabsList>
          <TabsContent value='all'>
            <DataTable
              columns={columns}
              data={products}
              options={{
                search: {
                  allowSearch: true,
                  searchColumn: 'productName',
                },
              }}
            />
          </TabsContent>
          <TabsContent value='available'>
            <DataTable
              columns={columns}
              data={products.filter(
                (product) => product.status === 'available'
              )}
              options={{
                search: {
                  allowSearch: true,
                  searchColumn: 'productName',
                },
              }}
            />
          </TabsContent>
          <TabsContent value='out of stock'>
            <DataTable
              columns={columns}
              data={products.filter(
                (product) => product.status === 'out of stock'
              )}
              options={{
                search: {
                  allowSearch: true,
                  searchColumn: 'productName',
                },
              }}
            />
          </TabsContent>
          <TabsContent value='active'>
            <DataTable
              columns={columns}
              data={products.filter((product) => product.status === 'active')}
              options={{
                search: {
                  allowSearch: true,
                  searchColumn: 'productName',
                },
              }}
            />
          </TabsContent>
          <TabsContent value='inactive'>
            <DataTable
              columns={columns}
              data={products.filter((product) => product.status === 'inactive')}
              options={{
                search: {
                  allowSearch: true,
                  searchColumn: 'productName',
                },
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </SidebarMaincontentLayout>
  );
}

export default AdminProductManagement;
