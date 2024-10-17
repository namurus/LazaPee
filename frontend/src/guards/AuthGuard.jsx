import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to='/auth/login' />;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
