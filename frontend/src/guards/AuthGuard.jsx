import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/atoms/LoadingSpinner';

function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return <LoadingSpinner className='min-h-screen' />;
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to='/auth/login' state={{ from: location }} />
  );
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
