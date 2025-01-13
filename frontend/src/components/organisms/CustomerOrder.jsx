import DataTable from '../molecules/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CurrencyFormatter from '../../helpers/CurrencyFormatter';
import { useState, useEffect } from 'react';

const data = [
  {
    id: 34,
    customerId: 1,
    shopId: 2,
    status: 'pending',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 20000,
    orderNote: null,
    paymentMethod: 'COD',
    shippingCompany: 'GHN',
    shippingFee: 0,
    OrderItems: [
      {
        id: 44,
        orderId: 34,
        skusId: 8,
        quantity: 2,
        price: 10000,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: -1,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            shop: {
              shop_id: 2,
              shopName: 'Fashion Boutique',
              status: 'on',
            },
            images: [],
          },
        },
      },
    ],
  },
  {
    id: 33,
    customerId: 1,
    shopId: 2,
    status: 'waiting for delivery',
    fullName: 'Nguyễn Hữu Cảnh',
    phoneNumber: '0973973267',
    shippingAddress: '123 Main Street, Cityville',
    shippingType: 'express',
    totalAmount: 20000,
    orderNote: null,
    paymentMethod: 'credit card',
    shippingCompany: 'GHN',
    shippingFee: 0,
    OrderItems: [
      {
        id: 43,
        orderId: 33,
        skusId: 8,
        quantity: 2,
        price: 10000,
        sku: {
          id: 8,
          productId: 7,
          price: '10000',
          stock_quantity: -1,
          color: null,
          size: null,
          product: {
            id: 7,
            productName: 'Sneakers Pro',
            shopId: 2,
            brand: 'BrandH',
            thumbnail: 'https://example.com/images/sneakers_thumbnail.jpg',
            description: 'Stylish sneakers for everyday wear.',
            slug: null,
            categoryId: 8,
            status: 'available',
            soldQuantity: 0,
            shop: {
              shop_id: 2,
              shopName: 'Fashion Boutique',
              status: 'on',
            },
            images: [],
          },
        },
      },
    ],
  },
];

function CustomerOrder() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await fetch('https://lazapee-jivl.onrender.com/order/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const result = await response.json();

        if (result.message === 'User orders retrieved successfully.') {
          setData(result.orders);
        } else {
          throw new Error('No orders found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const columns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Người mua', accessorKey: 'fullName' },
    {
      header: 'Tổng đơn hàng',
      accessorKey: 'totalAmount',
      cell: ({ row }) => {
        const total = parseFloat(row.getValue('totalAmount'));
        const formatted = CurrencyFormatter.formatWithLocaleInfo(total, 'VND');
        return <p className='text-sm text-muted-foreground'>{formatted}</p>;
      },
    },
    {
      header: 'Trạng thái',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.getValue('status');
        var displayStatus = '';

        switch (status) {
          case 'pending':
            displayStatus = 'Đang chờ';
            break;
          case 'waiting for delivery':
            displayStatus = 'Chờ vận chuyển';
            break;
          case 'shipping':
            displayStatus = 'Đang giao';
            break;
          case 'shipped':
            displayStatus = 'Đã giao';
            break;
          case 'canceled':
            displayStatus = 'Đã hủy';
            break;
        }

        return <span className='capitalize'>{displayStatus}</span>;
      },
    },
    {
      header: 'Phương thức giao hàng',
      accessorKey: 'shippingType',
      cell: ({ row }) => {
        const shippingType = row.getValue('shippingType');
        return (
          <span className='capitalize'>
            {' '}
            {shippingType === 'express' ? 'Nhanh' : 'Thường'}{' '}
          </span>
        );
      },
    },
    {
      header: 'Thao tác',
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <p
            className='cursor-pointer text-blue-600'
            onClick={() => handleAction(rowData)}
          >
            Xem chi tiết
          </p>
        );
      },
    },
  ];

  const handleAction = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const renderOrderItems = (order) => {
    return (
      <div>
        <h2 className='text-lg font-semibold'>Sản phẩm trong đơn hàng</h2>
        <table className='mt-4 border border-gray-300'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border px-4 py-2'>Tên sản phẩm</th>
              <th className='border px-4 py-2'>Brand</th>
              <th className='border px-4 py-2'>Hãng</th>
              <th className='border px-4 py-2'>Shop</th>
              <th className='border px-4 py-2'>Số lượng</th>
              <th className='border px-4 py-2'>Đơn giá</th>
              <th className='border px-4 py-2'>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order.OrderItems.map((item) => (
              <tr key={item.id}>
                <td className='border px-4 py-2'>{item.id}</td>
                <td className='border px-4 py-2'>
                  {item.sku.product.productName}
                </td>
                <td className='border px-4 py-2'>{item.sku.product.brand}</td>
                <td className='border px-4 py-2'>
                  {item.sku.product.shop.shopName}
                </td>
                <td className='border px-4 py-2'>{item.quantity}</td>
                <td className='border px-4 py-2'>
                  {CurrencyFormatter.formatWithLocaleInfo(
                    parseFloat(item.price),
                    'VND'
                  )}
                </td>
                <td className='border px-4 py-2'>
                  {CurrencyFormatter.formatWithLocaleInfo(
                    item.quantity * parseFloat(item.price),
                    'VND'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className='w-full px-24 py-6'>
      <Tabs defaultValue='all' onValueChange={(value) => console.log(value)}>
        <TabsList className='mb-6 grid w-max grid-cols-6 gap-6'>
          <TabsTrigger value='all'>Tất cả</TabsTrigger>
          <TabsTrigger value='pending'>Đang chờ</TabsTrigger>
          <TabsTrigger value='waiting for delivery'>Chờ vận chuyển</TabsTrigger>
          <TabsTrigger value='shipping'>Đang giao</TabsTrigger>
          <TabsTrigger value='shipped'>Đã giao</TabsTrigger>
          <TabsTrigger value='canceled'>Đã hủy</TabsTrigger>
        </TabsList>
        <TabsContent value='all'>
          <DataTable
            columns={columns}
            data={data}
            searchColumn={'productName'}
          />
        </TabsContent>
        <TabsContent value='pending'>
          <DataTable
            columns={columns}
            data={data.filter((order) => order.status === 'pending')}
            searchColumn={'productName'}
          />
        </TabsContent>
        <TabsContent value='waiting for delivery'>
          <DataTable
            columns={columns}
            data={data.filter(
              (order) => order.status === 'waiting for delivery'
            )}
            searchColumn={'productName'}
          />
        </TabsContent>
        <TabsContent value='shipping'>
          <DataTable
            columns={columns}
            data={data.filter((order) => order.status === 'shipping')}
            searchColumn={'productName'}
          />
        </TabsContent>
        <TabsContent value='shipped'>
          <DataTable
            columns={columns}
            data={data.filter((order) => order.status === 'shipped')}
            searchColumn={'productName'}
          />
        </TabsContent>
        <TabsContent value='canceled'>
          <DataTable
            columns={columns}
            data={data.filter((order) => order.status === 'canceled')}
            searchColumn={'productName'}
          />
        </TabsContent>
      </Tabs>
      <>
        {selectedOrder && isOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50'>
            <div className='flex w-full max-w-4xl flex-col rounded-lg bg-white p-6 shadow-lg'>
              <h2 className='mb-4 text-2xl font-semibold'>
                Chi tiết đơn hàng #{selectedOrder.id}
              </h2>
              <div className='flex flex-grow justify-center'>
                {renderOrderItems(selectedOrder)}
              </div>
              <div className='mt-4 flex justify-end'>
                <button
                  onClick={() => setIsOpen(false)}
                  className='rounded bg-red-500 px-6 py-2 text-white hover:bg-red-600'
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default CustomerOrder;
