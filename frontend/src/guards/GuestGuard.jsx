import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';

function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return !isAuthenticated ? (
    children
  ) : (
    <Navigate to='/' state={{ from: location }} />
  );
}

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;
