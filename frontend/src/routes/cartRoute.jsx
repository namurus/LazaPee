import { getMyCart } from '../api/admin/cart';
import CartCheckoutPage from '../components/pages/CartCheckoutPage';
import CartPage from '../components/pages/CartPage';
import AuthGuard from '../guards/AuthGuard';

const route = {
  path: '/cart',
  element: (
    <AuthGuard>
      <CartCheckoutPage />
    </AuthGuard>
  ),
  loader: loader,
  handle: {
    crumb: () => [
      {
        name: 'Cart',
        path: '/cart',
      },
    ],
  },
};

export async function loader() {
  try {
    const response = await getMyCart();
    console.log(response);
    return response;
  } catch {
    throw new Error('Failed to fetch cart items');
  }
}

export default route;
