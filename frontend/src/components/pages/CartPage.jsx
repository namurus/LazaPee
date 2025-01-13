import { useLoaderData } from 'react-router-dom';
import Breadcrumbs from '../molecules/Breadcrumbs';
import Button from '../atoms/Button';
import PropTypes from 'prop-types';
import { useState } from 'react';
import QuantitySelector from '../atoms/QuantitySelector';
import Image from '../atoms/Image';
import { ArrowRight, Tag, Trash2 } from 'lucide-react';
import ValueConverter from '../../helpers/ValueConverter';
import { toast } from 'sonner';
import {
  checkoutFromCart,
  checkVoucher,
  deleteProductFromCart,
  updateCartQuantity,
} from '../../api/admin/cart';

function CartItem({ item, handleQuantityChange, handleRemoveItem }) {
  return (
    <div
      className={`cart-item flex gap-[0.875rem] border-b-1 border-black border-opacity-10 py-4 first:pt-0 last:border-b-0 last:pb-0 md:gap-4 lg:py-6`}
    >
      <div className='flex aspect-square w-1/3 items-center justify-center rounded-lg bg-[#F0EEED] lg:max-h-32 lg:w-auto'>
        <Image
          src={item.thumbnail}
          alt={`${item.productName} image`}
          className='h-full object-cover object-center'
        />
      </div>
      <div className={'flex flex-1 flex-col'}>
        <div>
          <div className='flex items-center justify-between'>
            <h2 className={`text-base font-semibold lg:text-xl`}>
              {item.productName}
            </h2>
            <Button
              style={'text-red-600 text-sm font-light'}
              onClick={() => handleRemoveItem(item.cartItemId)}
            >
              <Trash2 />
            </Button>
          </div>
          <div className={`text-[0.75rem] font-light lg:text-sm`}>
            {item.size && (
              <p>
                <strong>Size:</strong>
                {item.size}
              </p>
            )}
            {item.color && (
              <p>
                <strong>Color:</strong>
                {item.color}
              </p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-2 items-end justify-between gap-4 text-xl font-semibold lg:text-2xl'>
          <h2>{ValueConverter.formatCurrency(item.price, 'VND')}</h2>
          <QuantitySelector
            defaultQuantity={item.quantity}
            handleQuantityChange={handleQuantityChange}
            className='justify-self-end'
          />
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.object,
  handleQuantityChange: PropTypes.func,
  handleRemoveItem: PropTypes.func,
};

function CartPage({ cartData, setCheckoutPage }) {
  const [cartItems, setCartItems] = useState(cartData.cartItems);
  const [total, setTotal] = useState(cartData.total);
  const [discountedTotal, setDiscountedTotal] = useState(
    cartData.discountedTotal
  );
  const [voucherCode, setVoucherCode] = useState({
    code: '',
    isCorrectedCode: false,
  });
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = async (id, quantity) => {
    try {
      const response = await updateCartQuantity(id, quantity);
      const updatedItems = cartItems.map((item) => {
        if (item.cartItemId === id) {
          return { ...item, quantity };
        }
        return item;
      });
      setCartItems(updatedItems);
      setTotal(response.total);
      setDiscountedTotal(response.discountedTotal);
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const response = await deleteProductFromCart(id);
      setCartItems(cartItems.filter((item) => item.cartItemId !== id));
      const deletedItem = cartItems.find((item) => item.cartItemId === id);
      setTotal(total - deletedItem.price * deletedItem.quantity);
      setDiscountedTotal(
        discountedTotal - deletedItem.price * deletedItem.quantity
      );
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  const handleVoucherApply = async () => {
    try {
      // Apply voucher logic here
      const response = await checkVoucher(voucherCode.code);
      if (!response) {
        throw new Error('Invalid voucher code');
      }
      setVoucherCode({ ...voucherCode, isCorrectedCode: true });
    } catch (error) {
      console.error(error);
      toast.error('Mã giảm giá không hợp lệ', {
        className: 'bg-red-500 text-white',
        position: 'top-right',
        closeButton: true,
      });
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await checkoutFromCart(
        voucherCode.isCorrectedCode ? voucherCode.code : null
      );
      if (!response) {
        throw new Error('Error checking out');
      }
      setCheckoutPage(response);
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
    <div>
      <div className='sm:container sm:mx-auto'>
        <Breadcrumbs />
        <h1 className='font-display text-[2rem]'>Giỏ hàng của bạn</h1>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-3 md:flex-row'>
          <div className='card-list col-span-2 grid max-h-[48rem] overflow-auto rounded-[1.25rem] border p-[0.875rem] lg:px-6 lg:py-5'>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  item={item}
                  key={item.cartItemId}
                  handleQuantityChange={(quantity) =>
                    handleQuantityChange(item.cartItemId, quantity)
                  }
                  handleRemoveItem={handleRemoveItem}
                />
              ))
            ) : (
              <p className='text-center'>Giỏ hàng của bạn đang trống</p>
            )}
          </div>
          <div className='flex h-fit flex-col gap-4 rounded-[1.25rem] border p-5 lg:gap-6 lg:px-6'>
            <h2 className='text-xl font-semibold md:text-2xl'>
              Tóm tắt đơn hàng
            </h2>
            <div className='grid grid-cols-1 gap-5 text-base font-light lg:text-xl'>
              <div className='flex justify-between'>
                <p className='opacity-60'>Tổng cộng</p>
                <p className='font-semibold'>
                  {ValueConverter.formatCurrency(total, 'VND')}
                </p>
              </div>
              <div className='flex justify-between border-b-1 border-black border-opacity-10 pb-5'>
                <p className='opacity-60'>
                  Giảm giá{discount > 0 ? `(-${discount * 100}%)` : ''}
                </p>
                <p className='font-semibold'>
                  -{ValueConverter.formatCurrency(discount, 'VND')}
                </p>
              </div>
              <div className='flex justify-between'>
                <p>Tổng trả</p>
                <p className='text-xl font-semibold'>
                  {ValueConverter.formatCurrency(discountedTotal, 'VND')}
                </p>
              </div>
            </div>
            <div className='flex items-center justify-between text-sm lg:text-base'>
              <div className='flex-1 rounded-full bg-[#F0F0F0] px-4 py-3 font-light'>
                <Tag className='mr-[0.625rem] inline-block opacity-60 lg:mr-3' />
                <input
                  type='text'
                  className='bg-transparent outline-none'
                  placeholder='Nhập mã giảm giá'
                  value={voucherCode.code}
                  onChange={(e) =>
                    setVoucherCode({ ...voucherCode, code: e.target.value })
                  }
                />
              </div>
              <Button
                onClick={handleVoucherApply}
                className={
                  'ml-3 rounded-full border-2 border-black bg-black px-4 py-3 text-white transition-colors hover:bg-transparent hover:text-black'
                }
              >
                Áp dụng
              </Button>
            </div>
            <Button
              onClick={handleCheckout}
              className={
                'mt-5 rounded-full border-2 border-black bg-black px-4 py-3 font-light text-white transition-colors hover:bg-transparent hover:font-normal hover:text-black'
              }
            >
              Thanh toán <ArrowRight className='ml-2 inline' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
