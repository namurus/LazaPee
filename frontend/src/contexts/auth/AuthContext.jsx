import { createContext, useEffect, useReducer } from 'react';
import { initialize, reducer } from './reducers';
import PropTypes from 'prop-types';
import { initialState } from './constant';

const mockUser = {
  id: 1,
  email: 'johndoe@example.com',
  displayName: 'John Doe',
  photoURL: '/static/images/avatars/avatar_8.png',
  role: 'user',
};

const mockGetMe = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser);
    }, 500);
  });

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const action = async () => {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      if (!accessToken) {
        return dispatch(initialize({ isAuthenticated: false, user: null }));
      }

      try {
        const user = await mockGetMe();
        dispatch(initialize({ isAuthenticated: true, user }));
      } catch {
        localStorage.removeItem('ACCESS_TOKEN');
        dispatch(initialize({ isAuthenticated: false, user: null }));
      }
    };
    action();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
