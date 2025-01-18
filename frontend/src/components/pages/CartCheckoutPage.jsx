import { useLoaderData } from 'react-router-dom';
import CartPage from './CartPage';
import { useState } from 'react';
import CheckoutPage from './CheckoutPage';
import { useNavigate } from 'react-router-dom';

function CartCheckoutPage() {
  const navigate = useNavigate();
  const cartData = useLoaderData();
  const [isCheckingOut, setIsCheckingOut] = useState({
    state: false,
    checkoutData: {},
  });
  const handleCheckout = (checkoutData) => {
    setIsCheckingOut({ state: true, checkoutData });
  };
  return isCheckingOut.state ? (
    <CheckoutPage checkoutInfo={isCheckingOut.checkoutData} />
  ) : (
    <CartPage cartData={cartData} setCheckoutPage={handleCheckout} />
  );
}

export default CartCheckoutPage;
