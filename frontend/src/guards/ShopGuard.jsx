import OpenShopPage from '../components/pages/OpenShopPage';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/atoms/LoadingSpinner';

import PropTypes from 'prop-types';

function ShopGuard({ children }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <LoadingSpinner outerClassName='min-h-screen' />;
  }
  const hasShop = user.role === 'seller';
  return hasShop ? children : <OpenShopPage />;
}

ShopGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopGuard;
