import AddressTag from '../molecules/AddressTag';
import Breadcrumbs from '../molecules/Breadcrumbs';
import { PaymentMethodList } from '../molecules/PaymentMethod';
import ShippingMethodList from '../molecules/ShippingMethodList';
import DataTable from '../molecules/DataTable';
import { TableCell, TableRow } from '../ui/table';
import ProductImage from '../atoms/ProductImage';
import { Link, redirect, useNavigate } from 'react-router-dom';
import ValueConverter from '../../helpers/ValueConverter';
import { Button } from '../ui/button';

const columns = [
  {
    header: 'Sản phẩm',
    accessorKey: 'product',

    cell: ({ row }) => {
      const productName = row.original.productName;
      const productThumbnail = row.original.thumbnail;
      return (
        <div className='space-y-2'>
          {/* <Link
            to={product.shopInfo.shopLink}
            className='text-base font-semibold'
          >
            {product.shopInfo.shopName}
          </Link> */}
          <div className='flex items-center gap-4'>
            <ProductImage
              src={productThumbnail}
              alt={productName}
              className='w-10 rounded-lg p-1'
            />
            <p className='text-base'>{productName}</p>
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

import PropTypes from 'prop-types';
import { toast } from 'sonner';
import { post } from '../../api/config';

function CheckoutPage({ checkoutInfo }) {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle submit
    const formData = new FormData(e.target);
    try {
      const response = await post('/order', formData);

      console.log(response);
      if (!response) {
        throw new Error('Error creating order');
      }
      if (formData.get('paymentMethod') === 'COD') {
        toast.success('Đặt hàng thành công', {
          className: 'bg-green-500 text-white',
          position: 'top-right',
          closeButton: true,
        });
        navigate('/');
      } else {
        navigate('/qr_payment', {
          state: {
            qrCode: response.qrCode,
            orderIds: response.orderIds.split(', ').map((id) => {
              return parseInt(id);
            }),
            paymentId: response.paymentId,
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra khi thanh toán, vui lòng thử lại sau', {
        className: 'bg-red-500 text-white',
        position: 'top-right',
        closeButton: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='hidden'
        name='voucherCode'
        value={checkoutInfo.voucherCode}
      />
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
                    name: checkoutInfo.userInfo.fullName,
                    number: checkoutInfo.userInfo.phone,
                  },
                  address: checkoutInfo.userInfo.address,
                }}
              />
              <input
                type='hidden'
                name='shippingAddress'
                value={checkoutInfo.userInfo.address}
              />
              <input
                type='hidden'
                name='phoneNumber'
                value={checkoutInfo.userInfo.phone}
              />
              <input
                type='hidden'
                name='fullName'
                value={checkoutInfo.userInfo.fullName}
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
              data={checkoutInfo.products.map((product) => ({
                ...product,
                discount: checkoutInfo.discountPercentage * product.price,
              }))}
              options={{
                search: {
                  allowSearch: false,
                },
              }}
              footer={
                <TableRow>
                  <TableCell colSpan={3}>Tổng tiền</TableCell>
                  <TableCell>
                    -
                    {ValueConverter.formatCurrency(
                      checkoutInfo.discountPercentage * checkoutInfo.total,
                      'VND'
                    )}
                  </TableCell>
                  <TableCell>
                    {ValueConverter.formatCurrency(checkoutInfo.total, 'VND')}
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
CheckoutPage.propTypes = {
  checkoutInfo: PropTypes.shape({
    voucherCode: PropTypes.string.isRequired,
    userInfo: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        product: PropTypes.shape({
          shopInfo: PropTypes.shape({
            shopLink: PropTypes.string.isRequired,
            shopName: PropTypes.string.isRequired,
          }).isRequired,
          thumbnail: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
    discountPercentage: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default CheckoutPage;
