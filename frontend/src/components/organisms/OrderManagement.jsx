import DataTable from '../molecules/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';
import PrepareOrderDialog, {
  SelectDelivery,
} from '../molecules/PrepareOrderDialog';
import ResponsiveDialog from '../molecules/ResonsiveDialog';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import ValueConverter from '../../helpers/ValueConverter';
import { get, patch } from '../../api/config';
import { toast } from 'sonner';

const OrderDetailDialog = ({ order, onClose, open, setOpen }) => {
  return (
    <ResponsiveDialog
      onClose={onClose}
      isOpen={open}
      setIsOpen={setOpen}
      title={'Chi tiết đơn hàng'}
      description={'Chi tiết đơn hàng'}
    >
      <div className='flex flex-col gap-4'>
        <div>
          <h3 className='text-lg font-semibold'>Thông tin đơn hàng</h3>
          <div className='flex flex-col gap-2'>
            <p className='text-sm text-gray-500'>ID: {order.id}</p>
            <p className='text-sm text-gray-500'>Trạng thái: {order.status}</p>
            <p className='text-sm text-gray-500'>
              Vận chuyển: {order.shippingCompany}
            </p>
            <p className='text-sm text-gray-500'>
              Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
            </p>
          </div>
        </div>
        <div>
          <h3 className='text-lg font-semibold'>Thông tin người nhận</h3>
          <div className='flex flex-col gap-2'>
            <p className='text-sm text-gray-500'>{order.fullName}</p>
            <p className='text-sm text-gray-500'>{order.phoneNumber}</p>
            <p className='text-sm text-gray-500'>{order.shippingAddress}</p>
          </div>
        </div>
        <div>
          <h3 className='text-lg font-semibold'>Sản phẩm</h3>
          <div className='flex flex-col gap-2'>
            {order.OrderItems.map((item) => (
              <div key={item.id} className='flex flex-col gap-2'>
                <p className='text-sm text-gray-500'>
                  {item.sku.product.productName}
                </p>
                <p className='text-sm text-gray-500'>
                  Số lượng: {item.quantity}
                </p>
                <p className='text-sm text-gray-500'>
                  Giá: {ValueConverter.formatCurrency(item.price, 'VND')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ResponsiveDialog>
  );
};

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState({
    activeDialog: null,
    selectedOrder: null,
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
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
  //       return (
  //         <p
  //           className='cursor-pointer text-blue-600'
  //           onClick={() => handleAction(rowData)}
  //         >
  //           {row.getValue('actions')}
  //         </p>
  //       );
  //     },
  //   },
  // ];

  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Sản phẩm',
      accessorKey: 'OrderItems',
      cell: ({ row }) => {
        const items = row.original.OrderItems;
        return (
          items.map((item) => item.sku.product.productName).join(', ') || ''
        );
      },
    },
    {
      header: 'Tổng tiền',
      accessorKey: 'totalAmount',
      cell: ({ row }) => {
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(row.original.totalAmount);
      },
    },
    {
      header: 'Trạng thái',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        const statusText = {
          pending: 'Chờ xử lý',
          canceled: 'Đã hủy',
          'waiting for delivery': 'Chờ giao hàng',
          delivering: 'Đang giao',
          completed: 'Hoàn thành',
        };
        return statusText[status] || status;
      },
    },
    {
      header: 'Vận chuyển',
      accessorKey: 'shippingCompany',
    },
    {
      header: 'Thông tin người nhận',
      accessorKey: 'fullName',
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div>
            <div>{order.fullName}</div>
            <div className='text-sm text-gray-500'>{order.phoneNumber}</div>
            <div className='text-sm text-gray-500'>{order.shippingAddress}</div>
          </div>
        );
      },
    },
    {
      header: 'Ngày đặt',
      accessorKey: 'createdAt',
      cell: ({ row }) => {
        return new Date(row.original.createdAt).toLocaleDateString('vi-VN');
      },
    },
    {
      header: 'Thao tác',
      id: 'actions',
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {status === 'pending' && (
                <DropdownMenuItem onSelect={() => handleAction(row.original)}>
                  Chuẩn bị hàng
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onSelect={() => handleViewDetail(row.original)}>
                Xem chi tiết
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const fetchData = async () => {
    try {
      const res = await get('/shop/orders');
      console.log(res);
      setOrders(res.data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleViewDetail = (order) => {
    console.log(order);
    setOpen({
      activeDialog: 'orderDetail',
      selectedOrder: order,
    });
  };

  const handleComfirmOrder = async (shippingCompany) => {
    console.log(selectedOrder);
    const orderId = selectedOrder.id;
    try {
      const res = await patch(`/order/${orderId}`, {
        status: 'waiting for delivery',
        shippingCompany,
      });
      console.log(res);
      return true;
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleOptionSelect = async (option) => {
    switch (option) {
      case 'self': {
        const sucess = await handleComfirmOrder();
        if (sucess) {
          setIsOpen(false);
          toast.success('Đã xác nhận đơn hàng thành công', {
            className: 'bg-green-500 text-white',
            position: 'top-right',
            closeButton: true,
          });
        } else {
          toast.error(
            'Có lỗi xảy ra khi xác nhận đơn hàng, vui lòng thử lại sau',
            {
              className: 'bg-red-500 text-white',
              position: 'top-right',
              closeButton: true,
            }
          );
        }
        // Do nothing for now
        break;
      }
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
                  onConfirm={async (shippingCompany) => {
                    const sucess = await handleComfirmOrder(
                      shippingCompany.name
                    );
                    if (sucess) {
                      setIsOpen(false);
                      toast.success('Đã xác nhận đơn hàng thành công', {
                        className: 'bg-green-500 text-white',
                        position: 'top-right',
                        closeButton: true,
                      });
                      fetchData();
                    } else {
                      toast.error(
                        'Có lỗi xảy ra khi xác nhận đơn hàng, vui lòng thử lại sau',
                        {
                          className: 'bg-red-500 text-white',
                          position: 'top-right',
                          closeButton: true,
                        }
                      );
                      // Do nothing for now
                    }
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
            data={orders}
            options={{
              search: {
                searchColumn: 'OrderItems',
                allowSearch: true,
              },
            }}
          />
        </TabsContent>
        <TabsContent value='pending'>
          <DataTable
            columns={columns}
            data={orders.filter((order) => order.status === 'pending')}
            options={{
              search: {
                searchColumn: 'OrderItems',
                allowSearch: true,
              },
            }}
          />
        </TabsContent>
        <TabsContent value='delivering'>
          <DataTable
            columns={columns}
            data={orders.filter((order) => order.status === 'delivering')}
            options={{
              search: {
                searchColumn: 'OrderItems',
                allowSearch: true,
              },
            }}
          />
        </TabsContent>
        <TabsContent value='completed'>
          <DataTable
            columns={columns}
            data={orders.filter((order) => order.status === 'completed')}
            options={{
              search: {
                searchColumn: 'OrderItems',
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
        {open.activeDialog === 'orderDetail' && (
          <OrderDetailDialog
            order={open.selectedOrder}
            open={open.activeDialog === 'orderDetail'}
            setOpen={() => setOpen({ activeDialog: null, selectedOrder: null })}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </>
    </SidebarMaincontentLayout>
  );
}

export default OrderManagement;
