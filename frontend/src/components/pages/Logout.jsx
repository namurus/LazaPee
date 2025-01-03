import { logout } from '../../contexts/auth/reducers';
import { useAuth } from '../../hooks/useAuth';

function Logout() {
  const { dispatch } = useAuth();

  dispatch(logout());
  return null;
}

export default Logout;
