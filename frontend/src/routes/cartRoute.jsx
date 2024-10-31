import CartPage from '../components/pages/CartPage';
import AuthGuard from '../guards/AuthGuard';

const route = {
  path: '/cart',
  element: (
    <AuthGuard>
      <CartPage />
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
    const response = await fetch('https://dummyjson.com/carts/3');
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch {
    throw new Error('Failed to fetch cart items');
  }
}

export default route;
