import { createContext, useEffect, useLayoutEffect, useReducer } from 'react';
import { initialize, logout, reducer } from './reducers';
import PropTypes from 'prop-types';
import { initialState } from './constant';
import { getMe } from '../../api/user/auth';
import { instance } from '../../api/config';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const user = await getMe();
        console.log(user);
        dispatch(initialize({ isAuthenticated: true, user: user }));
      } catch {
        dispatch(
          initialize({
            isAuthenticated: false,
            user: null,
            isInitialized: true,
          })
        );
      }
    };
    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const interceptor = instance.interceptors.request.use((config) => {
      config.headers.Authorization =
        state.user && state.user.accessToken && !config._retry
          ? `Bearer ${state.user.accessToken}`
          : config.headers.Authorization;
      return config;
    });
    return () => instance.interceptors.request.eject(interceptor);
  }, [state.user]);

  useLayoutEffect(() => {
    /*
      Using local storage to store the refresh token for now. Will be replaced with a secure cookie in the future.
    */
    const interceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        // const originalRequest = error.config;
        if (error.response.status === 401) {
          localStorage.removeItem('ACCESS_TOKEN');
          dispatch(logout());
          // try {
          //   const refreshToken = await getRefreshToken();
          //   dispatch(login({ userAccessToken: refreshToken }));

          //   originalRequest.headers.Authorization = `Bearer ${refreshToken}`;
          //   originalRequest._retry = true;

          //   return instance(originalRequest);
          // } catch {
          //   dispatch(logout());
          // }
        }
      }
    );
    return () => instance.interceptors.response.eject(interceptor);
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
