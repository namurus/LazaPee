import DataTable from '../molecules/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';

import { Button } from '../ui/button';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { get } from '../../api/config';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import CurrencyFormatter from '../../helpers/CurrencyFormatter';

const data = [
  {
    id: 17,
    productName: 'Smart phone',
    shopId: 7,
    brand: 'Smart phone',
    thumbnail:
      'http://res.cloudinary.com/dlao1onv5/image/upload/v1736395928/j39nqcnctiuc7tzf9yqn.jpg',
    description: 'description Smart phone',
    slug: 'smart-phone',
    categoryId: 2,
    status: 'available',
    soldQuantity: 0,
    createdAt: '2025-01-09T04:12:09.000Z',
    updatedAt: '2025-01-09T04:12:09.000Z',
    deletedAt: null,
    category: {
      name: 'Smartphone',
      description: 'Smartphone',
      thumbnail: 'https://via.placeholder.com/150',
    },
    images: [
      {
        url: 'http://res.cloudinary.com/dlao1onv5/image/upload/v1736395928/j39nqcnctiuc7tzf9yqn.jpg',
      },
    ],
    skus: [
      {
        size: 'XL',
        color: 'red',
        stock_quantity: 0,
        price: '500',
      },
      {
        size: 'X',
        color: 'green',
        stock_quantity: 0,
        price: '500',
      },
    ],
  },
];

function AdminProductManagement() {
  const [products, setProducts] = useState(data);

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
          case 'circulating':
            return <Badge variant="success">Lưu hành</Badge>;
          case 'pending':
            return <Badge variant="warning">Chờ duyệt</Badge>;
          case 'banned':
            return <Badge variant="destructive">Bị cấm</Badge>;
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
            {/* <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
              Xóa sản phẩm
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await get('/admin/product');
      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const handleDelete = (id) => {
    try {
      console.log('delete', id);
      // await deleteProduct(id);
      fetchData();
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  };

  return (
    <SidebarMaincontentLayout>
      <div className='flex flex-col space-y-6'>
        <Tabs defaultValue='all'>
          <TabsList className='mb-6 grid w-max grid-cols-4 gap-4' onChan>
            <TabsTrigger value='all'>Tất cả</TabsTrigger>
            <TabsTrigger value='circulating'>Lưu hành</TabsTrigger>
            <TabsTrigger value='pending'>Chờ duyệt</TabsTrigger>
            <TabsTrigger value='banned'>Bị cấm</TabsTrigger>
          </TabsList>
          <TabsContent value='all'>
            <DataTable
              columns={columns}
              data={products}
              searchColumn={'productName'}
            />
          </TabsContent>
          <TabsContent value='circulating'>
            <DataTable
              columns={columns}
              data={data.filter((product) => product.status === 'circulating')}
              searchColumn={'productName'}
            />
          </TabsContent>
          <TabsContent value='pending'>
            <DataTable
              columns={columns}
              data={data.filter((product) => product.status === 'pending')}
              searchColumn={'productName'}
            />
          </TabsContent>
          <TabsContent value='banned'>
            <DataTable
              columns={columns}
              data={data.filter(
                (product) =>
                  product.status === 'banned' || product.status === null
              )}
              searchColumn={'productName'}
            />
          </TabsContent>
        </Tabs>
        <Link to='./new' className='self-end'>
          <Button>
            Thêm 1 sản phẩm mới <Plus />
          </Button>
        </Link>
      </div>
    </SidebarMaincontentLayout>
  );
}

export default AdminProductManagement;
