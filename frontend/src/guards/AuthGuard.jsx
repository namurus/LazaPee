import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
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
