import { Link } from 'react-router-dom';
import { CardPage } from '../pages';
// import { AuthGuard } from '../guards';

const route = {
  path: '/cart',
  element: <CardPage />,
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

export function action() {
  return null;
}

export default route;
