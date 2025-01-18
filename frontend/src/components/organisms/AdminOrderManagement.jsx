import DataTable from '../molecules/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';
import CurrencyFormatter from '../../helpers/CurrencyFormatter';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// dữ liệu mẫu
// {
//   "code": 200,
//   "message": "Success",
//   "data": [
//       {
//           "id": 1,
//           "orderId": 1,
//           "skusId": 1,
//           "quantity": 2,
//           "price": 99.99,
//           "createdAt": "2025-01-13T18:10:43.000Z",
//           "updatedAt": "2025-01-13T18:10:43.000Z",
//           "deletedAt": null,
//           "sku": {
//               "id": 1,
//               "productId": 1,
//               "price": "1000",
//               "stock_quantity": 10,
//               "color": "red",
//               "size": null,
//               "createdAt": "2025-01-13T18:10:42.000Z",
//               "updatedAt": "2025-01-13T18:10:42.000Z",
//               "product": {
//                   "id": 1,
//                   "productName": "Samsung Galaxy A20"
//               }
//           },
//           "order": {
//               "id": 1,
//               "customerId": 1,
//               "shopId": 3,
//               "status": "pending",
//               "fullName": "Nguyễn Văn Bảo",
//               "phoneNumber": "0977466534",
//               "shippingAddress": "38, Bùi Thị Xuân, Quận 1, TP.HCM",
//               "shippingType": "standard",
//               "totalAmount": 300000,
//               "orderNote": "Please handle with care",
//               "paymentMethod": "credit card",
//               "shippingCompany": "UPS",
//               "shippingFee": 20000,
//               "createdAt": "2025-01-13T18:10:43.000Z",
//               "updatedAt": "2025-01-13T18:10:43.000Z",
//               "deletedAt": null,
//               "customer": {
//                   "id": 1,
//                   "fullName": "Nguyễn Văn Bảo",
//                   "email": "VanBao113@gmail.com",
//                   "avatar": "https://i.pinimg.com/736x/6e/af/1a/6eaf1a844ae4b6fa6eeb6ff17f468cc0.jpg",
//                   "phone": "0977466534",
//                   "address": "38, Bùi Thị Xuân, Quận 1, TP.HCM"
//               }
//           }
//       },
//       {
//           "id": 2,
//           "orderId": 1,
//           "skusId": 2,
//           "quantity": 1,
//           "price": 999.99,
//           "createdAt": "2025-01-13T18:10:43.000Z",
//           "updatedAt": "2025-01-13T18:10:43.000Z",
//           "deletedAt": null,
//           "sku": {
//               "id": 2,
//               "productId": 1,
//               "price": "1000",
//               "stock_quantity": 15,
//               "color": "blue",
//               "size": null,
//               "createdAt": "2025-01-13T18:10:42.000Z",
//               "updatedAt": "2025-01-13T18:10:42.000Z",
//               "product": {
//                   "id": 1,
//                   "productName": "Samsung Galaxy A20"
//               }
//           },
//           "order": {
//               "id": 1,
//               "customerId": 1,
//               "shopId": 3,
//               "status": "pending",
//               "fullName": "Nguyễn Văn Bảo",
//               "phoneNumber": "0977466534",
//               "shippingAddress": "38, Bùi Thị Xuân, Quận 1, TP.HCM",
//               "shippingType": "standard",
//               "totalAmount": 300000,
//               "orderNote": "Please handle with care",
//               "paymentMethod": "credit card",
//               "shippingCompany": "UPS",
//               "shippingFee": 20000,
//               "createdAt": "2025-01-13T18:10:43.000Z",
//               "updatedAt": "2025-01-13T18:10:43.000Z",
//               "deletedAt": null,
//               "customer": {
//                   "id": 1,
//                   "fullName": "Nguyễn Văn Bảo",
//                   "email": "VanBao113@gmail.com",
//                   "avatar": "https://i.pinimg.com/736x/6e/af/1a/6eaf1a844ae4b6fa6eeb6ff17f468cc0.jpg",
//                   "phone": "0977466534",
//                   "address": "38, Bùi Thị Xuân, Quận 1, TP.HCM"
//               }
//           }
//       }
//   ],
//   "total": 4,
//   "page": 1,
//   "perPage": 2,
//   "totalPage": 2
// }

function AdminOrderManagement() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('ADMIN_ACCESS_TOKEN');
        const response = await axios.get(
          'https://lazapee-jivl.onrender.com/admin/order',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Orders:', response.data.data);

        setData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { header: 'ID', accessorKey: 'id' },
    {
      header: 'Ngày lập đơn',
      accessorKey: 'createdAt',
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return (
          <p className='text-sm text-muted-foreground'>
            {date.toLocaleString()}
          </p>
        );
      },
    },
    {
      header: 'Tên sản phẩm',
      accessorKey: 'productName',
      cell: ({ row }) => (
        <div className='space-y-1'>
          <p className='font-medium'>{row.original.sku.product.productName}</p>
        </div>
      ),
    },
    {
      header: 'Tổng đơn hàng',
      accessorKey: 'totalAmount',
      cell: ({ row }) => {
        const total = parseFloat(row.original.order.totalAmount);
        const formatted = CurrencyFormatter.formatWithLocaleInfo(total, 'VND');
        return <p className='text-sm text-muted-foreground'>{formatted}</p>;
      },
    },
    {
      accessorKey: 'actions',
      header: 'Thao tác',
      cell: ({ row }) => {
        return (
          <p
            className='cursor-pointer text-blue-600'
            onClick={() => handleViewDetail(row.original.id)}
          >
            Xem chi tiết
          </p>
        );
      },
    },
  ];

  const handleViewDetail = (id) => {
    navigate(`./detail/${id}`);
  };

  return (
    <SidebarMaincontentLayout>
      <Tabs defaultValue='all' onValueChange={(value) => console.log(value)}>
        <TabsList className='mb-6 grid w-max grid-cols-4 gap-4'>
          <TabsTrigger value='all'>Tất cả</TabsTrigger>
          <TabsTrigger value='pending'>Chờ xác nhận</TabsTrigger>
          <TabsTrigger value='delivering'>Đang giao</TabsTrigger>
          <TabsTrigger value='completed'>Đã giao</TabsTrigger>
        </TabsList>
        <TabsContent value='all'>
          <DataTable
            columns={columns}
            data={data}
            options={{
              search: {
                allowSearch: true,
                searchColumn: 'productName',
              },
            }}
          />
        </TabsContent>
        <TabsContent value='pending'>
          <DataTable
            columns={columns}
            data={data}
            options={{
              search: {
                allowSearch: true,
                searchColumn: 'productName',
              },
            }}
          />
        </TabsContent>
        <TabsContent value='delivering'>
          <DataTable
            columns={columns}
            data={data}
            options={{
              search: {
                allowSearch: true,
                searchColumn: 'productName',
              },
            }}
          />
        </TabsContent>
        <TabsContent value='completed'>
          <DataTable
            columns={columns}
            data={data}
            options={{
              search: {
                allowSearch: true,
                searchColumn: 'productName',
              },
            }}
          />
        </TabsContent>
      </Tabs>
    </SidebarMaincontentLayout>
  );
}

export default AdminOrderManagement;
