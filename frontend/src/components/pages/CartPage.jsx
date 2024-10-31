import { useLoaderData } from 'react-router-dom';
import Breadcrumbs from '../molecules/Breadcrumbs';
import { FaMinus, FaPlus, FaTrash, FaTag, FaArrowRight } from 'react-icons/fa';
import Button from '../atoms/Button';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import QuantitySelector from '../atoms/QuantitySelector';

function CartItem({ item, handleQuantityChange, handleRemoveItem }) {
  const handleAdd = () => {
    handleQuantityChange(item.title, item.quantity + 1);
  };

  const handleSubtract = () => {
    if (item.quantity === 1) return;
    handleQuantityChange(item.title, item.quantity - 1);
  };

  return (
    <div className='cart-item flex gap-[0.875rem] border-b-1 border-black border-opacity-10 py-4 first:pt-0 last:border-b-0 last:pb-0 md:gap-4 lg:py-6'>
      <div className='flex aspect-square w-1/3 items-center justify-center rounded-lg bg-[#F0EEED] lg:max-h-32 lg:w-auto'>
        <img
          src={item.thumbnail}
          alt={`${item.title} image`}
          className='h-full object-cover object-center'
        />
      </div>
      <div className='flex flex-1 flex-col'>
        <div className='flex-1'>
          <div className='flex items-center justify-between'>
            <h2 className='text-base font-semibold lg:text-xl'>{item.title}</h2>
            <Button
              style={'text-red-600 text-sm font-light'}
              onClick={() => handleRemoveItem(item.title)}
            >
              <FaTrash />
            </Button>
          </div>
          <div className='text-[0.75rem] font-light lg:text-sm'>
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
          <h2>${item.price}</h2>
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

function CartPage() {
  const cartData = useLoaderData();
  const [cartItems, setCartItems] = useState(cartData.products);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const newTotal =
      Math.round(
        cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) *
          100
      ) / 100;
    setTotal(newTotal);
  }, [cartItems]);

  const handleQuantityChange = (title, quantity) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.title === title) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (title) => {
    setCartItems(cartItems.filter((item) => item.title !== title));
  };

  return (
    <div>
      <div className='sm:container sm:mx-auto'>
        <Breadcrumbs />
        <h1 className='font-display text-[2rem]'>Your cart</h1>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-3 md:flex-row'>
          <div className='card-list col-span-2 grid max-h-[48rem] overflow-auto rounded-[1.25rem] border p-[0.875rem] lg:px-6 lg:py-5'>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  item={item}
                  key={item.title}
                  handleQuantityChange={(quantity) =>
                    handleQuantityChange(item.title, quantity)
                  }
                  handleRemoveItem={handleRemoveItem}
                />
              ))
            ) : (
              <p className='text-center'>Your cart is empty</p>
            )}
          </div>
          <div className='flex h-fit flex-col gap-4 rounded-[1.25rem] border p-5 lg:gap-6 lg:px-6'>
            <h2 className='text-xl font-semibold md:text-2xl'>Order Summary</h2>
            <div className='grid grid-cols-1 gap-5 text-base font-light lg:text-xl'>
              <div className='flex justify-between'>
                <p className='opacity-60'>Subtotal</p>
                <p className='font-semibold'>${total}</p>
              </div>
              <div className='flex justify-between border-b-1 border-black border-opacity-10 pb-5'>
                <p className='opacity-60'>
                  Discount{discount > 0 ? `(-${discount * 100}%)` : ''}
                </p>
                <p className='font-semibold'>-${discount}</p>
              </div>
              <div className='flex justify-between'>
                <p>Total</p>
                <p className='text-xl font-semibold'>
                  ${(1 - discount) * total}
                </p>
              </div>
            </div>
            <div className='flex items-center justify-between text-sm lg:text-base'>
              <div className='flex-1 rounded-full bg-[#F0F0F0] px-4 py-3 font-light'>
                <FaTag className='mr-[0.625rem] inline-block opacity-60 lg:mr-3' />
                <input
                  type='text'
                  className='bg-transparent outline-none'
                  placeholder='Add promo code'
                />
              </div>
              <Button
                style={
                  'rounded-full bg-black text-white px-4 py-3 ml-3 hover:bg-transparent hover:text-black border-2 border-black transition-colors'
                }
              >
                Apply
              </Button>
            </div>
            <Button
              style={
                'rounded-full bg-black text-white px-4 py-3 mt-5 font-light hover:bg-transparent hover:text-black border-2 border-black transition-colors hover:font-normal'
              }
            >
              Go to Checkout <FaArrowRight className='ml-2 inline' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
