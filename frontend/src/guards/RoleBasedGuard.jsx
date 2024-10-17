import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';
function RoleBasedGuard({ children, allowedRoles }) {
  const { user } = useAuth();
  const hasRole = allowedRoles.includes(user.role);
  return hasRole ? children : <Navigate to='/' />;
}

RoleBasedGuard.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.array.isRequired,
};

export default RoleBasedGuard;
