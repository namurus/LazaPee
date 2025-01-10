import AddressTag from '../molecules/AddressTag';
import Breadcrumbs from '../molecules/Breadcrumbs';
import { PaymentMethodList } from '../molecules/PaymentMethod';
import ShippingMethodList from '../molecules/ShippingMethodList';
import DataTable from '../molecules/DataTable';
import { TableCell, TableRow } from '../ui/table';
import ProductImage from '../atoms/ProductImage';
import { Link } from 'react-router-dom';
import ValueConverter from '../../helpers/ValueConverter';
import { Button } from '../ui/button';

const columns = [
  {
    header: 'Sản phẩm',
    accessorKey: 'product',

    cell: ({ row }) => {
      const product = row.getValue('product');
      return (
        <div className='space-y-2'>
          <Link
            to={product.shopInfo.shopLink}
            className='text-base font-semibold'
          >
            {product.shopInfo.shopName}
          </Link>
          <div className='flex items-center gap-4'>
            <ProductImage
              src={product.image}
              alt={product.name}
              className='w-10 rounded-lg p-1'
            />
            <p className='text-base'>{product.name}</p>
          </div>
        </div>
      );
    },
  },
  {
    header: 'Số lượng',
    accessorKey: 'quantity',
  },
  {
    header: 'Đơn giá',
    accessorKey: 'price',
    cell: ({ row }) => {
      const value = row.getValue('price');
      return <span>{ValueConverter.formatCurrency(value, 'VND')}</span>;
    },
  },
  {
    header: 'Giảm giá',
    accessorKey: 'discount',
    cell: ({ row }) => {
      const value = row.getValue('discount');
      return <span>{ValueConverter.formatCurrency(value, 'VND')}</span>;
    },
  },
  {
    header: 'Thành tiền',
    accessorKey: 'total',
    cell: ({ row }) => {
      const value = row.getValue('total');
      return <span>{ValueConverter.formatCurrency(value, 'VND')}</span>;
    },
  },
];

const data = [
  {
    product: {
      name: 'Áo thun nam',
      image: 'https://via.placeholder.com/150',
      shopInfo: {
        shopName: 'Shop ABC',
        shopLink: '#',
      },
    },
    quantity: 2,
    price: 150000,
    discount: 30000,
    total: 270000,
  },
];

function CheckoutPage() {
  const dataInfo = {
    total: data.reduce((acc, cur) => acc + cur.total, 0),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='sm:container sm:mx-auto'>
        <Breadcrumbs />
        <h1 className='font-display text-[2rem]'>Thanh toán</h1>
        <div className='flex flex-col items-center gap-7'>
          <div className='grid w-1/3 items-center gap-7'>
            <div className='space-y-2'>
              <h2 className='text-base'>Địa chỉ nhận hàng</h2>
              <AddressTag
                addressInfo={{
                  user: {
                    name: 'Nguyễn Văn A',
                    number: '0123456789',
                  },
                  address: '123 Đường ABC, Quận XYZ, TP HCM',
                }}
              />
            </div>
            <div className='space-y-2'>
              <h2 className='text-base'>Phương thức giao hàng</h2>
              <ShippingMethodList />
            </div>
            <div className='space-y-2'>
              <h2 className='text-base'>Phương thức thanh toán</h2>
              <PaymentMethodList />
            </div>
          </div>
          <div className='w-2/3 space-y-2'>
            <h2 className='text-base'>Danh sách sản phẩm</h2>
            <DataTable
              columns={columns}
              data={data}
              options={{
                search: {
                  allowSearch: false,
                },
              }}
              footer={
                <TableRow>
                  <TableCell colSpan={4}>Tổng tiền</TableCell>
                  <TableCell>
                    {ValueConverter.formatCurrency(dataInfo.total, 'VND')}
                  </TableCell>
                </TableRow>
              }
            />
            <div className='flex justify-end'>
              <Button className='w-2/12 rounded-full px-4 py-2' type='submit'>
                Đặt hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CheckoutPage;
