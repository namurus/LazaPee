import { Link } from 'react-router-dom';
import { CartPage } from '../pages';
// import { AuthGuard } from '../guards';

const route = {
  path: '/cart',
  element: <CartPage />,
  loader: loader,
  handle: {
    crumb: () => <Link to='/cart'>Cart</Link>,
  },
};

// const getUserAccessToken = () => {
//     return localStorage.getItem('ACCESS_TOKEN');
// }

// const mockGetCartItems = () => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve([
//                 {
//                     id: 1,
//                     name: 'Product 1',
//                     price: 100,
//                     quantity: 2,
//                 },
//                 {
//                     id: 2,
//                     name: 'Product 2',
//                     price: 200,
//                     quantity: 1,
//                 },
//             ]);
//         }, 1000);
//     })
// }

export async function loader() {
  try {
    const response = await fetch('https://dummyjson.com/carts/2');
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
