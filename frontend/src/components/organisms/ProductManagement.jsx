import DataTable from '../molecules/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';
import CurrencyFormatter from '../../helpers/CurrencyFormatter';

import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const data = [
  {
    productName: 'Áo thun nam',
    productType: {
      'màu hồng': {
        price: 100000,
        soldCount: 100,
      },
      'màu đen': {
        price: 100000,
        soldCount: 100,
      },
    },
  },
  {
    productName: 'Áo thun nữ',
    productType: {
      '-': {
        price: 100000,
        soldCount: 100,
      },
    },
  },
  {
    productName: 'Quần jean nam',
    productType: {
      '-': {
        price: 100000,
        soldCount: 100,
      },
    },
  },
  {
    productName: 'Quần jean nữ',
    productType: {
      '-': {
        price: 100000,
        soldCount: 100,
      },
    },
  },
  {
    productName: 'Áo khoác nam',
    productType: {
      '-': {
        price: 100000,
        soldCount: 100,
      },
    },
  },
  {
    productName: 'Áo khoác nữ',
    productType: {
      '-': {
        price: 100000,
        soldCount: 100,
      },
    },
  },
  {
    productName: 'Giày thể thao nam',
    productType: {
      '-': {
        price: 100000,
        soldCount: 100,
      },
    },
  },
  {
    productName: 'Giày thể thao nữ',
    productType: {
      '-': {
        price: 100000,
        soldCount: 100,
      },
    },
  },
  {
    productName: 'Túi xách nữ',
    productType: {
      '-': {
        price: 100000,
        soldCount: 100,
      },
    },
  },
  {
    productName: 'Túi xách nam',
    productType: {
      '-': {
        price: 100000,
        soldCount: 100,
      },
    },
  },
  {
    productName: 'Đồng hồ nam',
    productType: {
      '-': {
        price: 100000,
        soldCount: 100,
      },
    },
  },
  {
    productName: 'Đồng hồ nữ',
    productType: {
      '-': {
        price: 100000,
        soldCount: 100,
      },
    },
  },
  {
    productName: 'Mắt kính nam',
    productType: {
      '-': {
        price: 100000,
        soldCount: 100,
      },
    },
  },
  {
    productName: 'Mắt kính nữ',
    productType: {
      '-': {
        price: 100000,
        soldCount: 100,
      },
    },
  },
];

function ProductManagement() {
  const columns = [
    { header: 'Tên sản phẩm', accessorKey: 'productName' },
    {
      header: 'Phân loại hàng',
      accessorKey: 'productType',
      cell: ({ row }) => {
        const productType = row.getValue('productType');
        const types = Object.keys(productType);
        return (
          <div className='space-y-1'>
            {types.map((type, index) => (
              <p key={index} className='text-sm text-muted-foreground'>
                {type}
              </p>
            ))}
          </div>
        );
      },
    },
    {
      header: 'Giá',
      accessorKey: 'productType',
      cell: ({ row }) => {
        const productType = row.getValue('productType');
        const price = Object.values(productType).map((type) => type.price);
        return (
          <div className='space-y-1'>
            {price.map((price, index) => (
              <p key={index} className='text-sm text-muted-foreground'>
                {CurrencyFormatter.formatWithLocaleInfo(price, 'VND')}
              </p>
            ))}
          </div>
        );
      },
    },
    {
      header: 'Đã bán',
      accessorKey: 'productType',
      cell: ({ row }) => {
        const productType = row.getValue('productType');
        const soldCount = Object.values(productType).map(
          (type) => type.soldCount
        );

        return (
          <div className='space-y-1'>
            {soldCount.map((count, index) => (
              <p key={index} className='text-sm text-muted-foreground'>
                {count}
              </p>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <SidebarMaincontentLayout>
      <div className='flex flex-col space-y-6'>
        <Tabs defaultValue='all' onValueChange={(value) => console.log(value)}>
          <TabsList className='mb-6 grid w-max grid-cols-4 gap-4' onChan>
            <TabsTrigger value='all'>Tất cả</TabsTrigger>
            <TabsTrigger value='available'>Còn hàng</TabsTrigger>
            <TabsTrigger value='out-of-stock'>Hết hàng</TabsTrigger>
            <TabsTrigger value='hidden'>Đã ẩn</TabsTrigger>
          </TabsList>
          <TabsContent value='all'>
            <DataTable
              columns={columns}
              data={data}
              searchColumn={'productName'}
            />
          </TabsContent>
          <TabsContent value='available'>
            <DataTable
              columns={columns}
              data={data}
              searchColumn={'productName'}
            />
          </TabsContent>
          <TabsContent value='out-of-stock'>
            <DataTable
              columns={columns}
              data={data}
              searchColumn={'productName'}
            />
          </TabsContent>
          <TabsContent value='hidden'>
            <DataTable
              columns={columns}
              data={data}
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

export default ProductManagement;
