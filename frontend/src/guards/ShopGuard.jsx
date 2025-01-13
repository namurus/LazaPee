import { Navigate } from 'react-router-dom';
import OpenShopPage from '../components/pages/OpenShopPage';
import { useAuth } from '../hooks/useAuth';

function ShopGuard({ children }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to='/auth/login' />;
  }
  const hasShop = user.role === 'seller';
  return hasShop ? children : <OpenShopPage />;
  //   return children;
}

export default ShopGuard;
