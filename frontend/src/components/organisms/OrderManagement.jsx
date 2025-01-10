import DataTable from '../molecules/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';
import CurrencyFormatter from '../../helpers/CurrencyFormatter';
import PrepareOrderDialog, {
  SelectDelivery,
} from '../molecules/PrepareOrderDialog';
import ResponsiveDialog from '../molecules/ResonsiveDialog';
import { useState } from 'react';

// const columns = [
//   { header: 'ID', accessorKey: 'id' },
//   { header: 'Tên sản phẩm', accessorKey: 'productName' },
//   {
//     header: 'Tổng đơn hàng',
//     accessorKey: 'orderTotal',
//     cell: ({ row }) => {
//       const total = parseFloat(row.getValue('orderTotal'));
//       const formatted = CurrencyFormatter.formatWithLocaleInfo(total, 'VND');
//       return <p className='text-sm text-muted-foreground'>{formatted}</p>;
//     },
//   },
//   { header: 'Trạng thái', accessorKey: 'state' },
//   { header: 'Vận chuyển', accessorKey: 'delivery' },
//   {
//     accessorKey: 'actions',
//     header: 'Thao tác',
//     cell: ({ row }) => {
//       const rowData = row.original;
//       console.log(rowData);
//       return (
//         <p className='cursor-pointer text-blue-600'>
//           {row.getValue('actions')}
//         </p>
//       );
//     },
//   },
// ];

const data = [
  {
    id: 1,
    productName: 'Áo thun nam',
    orderTotal: 61000,
    state: 'Đang giao',
    delivery: 'Giao hàng tiết kiệm',
    actions: 'Xem chi tiết',
  },
  {
    id: 2,
    productName: 'Áo thun nữ',
    orderTotal: 20000,
    state: 'Chờ xác nhận',
    delivery: 'Giao hàng nhanh',
    actions: 'Xem chi tiết',
  },
  {
    id: 3,
    productName: 'Quần jean nam',
    orderTotal: 30,
    state: 'Đã giao',
    delivery: 'Giao hàng tiết kiệm',
    actions: 'Xem chi tiết',
  },
];

function OrderManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const columns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Tên sản phẩm', accessorKey: 'productName' },
    {
      header: 'Tổng đơn hàng',
      accessorKey: 'orderTotal',
      cell: ({ row }) => {
        const total = parseFloat(row.getValue('orderTotal'));
        const formatted = CurrencyFormatter.formatWithLocaleInfo(total, 'VND');
        return <p className='text-sm text-muted-foreground'>{formatted}</p>;
      },
    },
    { header: 'Trạng thái', accessorKey: 'state' },
    { header: 'Vận chuyển', accessorKey: 'delivery' },
    {
      accessorKey: 'actions',
      header: 'Thao tác',
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <p
            className='cursor-pointer text-blue-600'
            onClick={() => handleAction(rowData)}
          >
            {row.getValue('actions')}
          </p>
        );
      },
    },
  ];

  const handleAction = (order) => {
    setSelectedOrder({
      ...order,
      renderInfo: {
        title: 'Chuẩn bị hàng',
        description: `Chuẩn bị hàng cho đơn hàng #${order.id}`,
        rederComponent: (
          <PrepareOrderDialog
            onConfirmOption={(option) => handleOptionSelect(option)}
          />
        ),
      },
    });
    setIsOpen(true);
  };

  const handleOptionSelect = (option) => {
    switch (option) {
      case 'self':
        setIsOpen(false);
        // Do nothing for now
        break;
      case 'delivery':
        setSelectedOrder((prev) => {
          return {
            ...prev,
            renderInfo: {
              title: 'Chuẩn bị hàng',
              description: null,
              rederComponent: (
                <SelectDelivery
                  onCancel={() => {
                    setIsOpen(false);
                    // clear selected order
                    setSelectedOrder(null);
                  }}
                  onConfirm={() => {
                    setIsOpen(false);
                    // Do nothing for now
                  }}
                />
              ),
            },
          };
        });
        break;
      default:
        break;
    }
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
                searchColumn: 'productName',
                allowSearch: true,
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
                searchColumn: 'productName',
                allowSearch: true,
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
                searchColumn: 'productName',
                allowSearch: true,
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
                searchColumn: 'productName',
                allowSearch: true,
              },
            }}
          />
        </TabsContent>
      </Tabs>
      <>
        {selectedOrder && (
          <ResponsiveDialog
            title={selectedOrder.renderInfo.title}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            description={selectedOrder.renderInfo.description}
          >
            {selectedOrder.renderInfo.rederComponent}
          </ResponsiveDialog>
        )}
      </>
    </SidebarMaincontentLayout>
  );
}

export default OrderManagement;
