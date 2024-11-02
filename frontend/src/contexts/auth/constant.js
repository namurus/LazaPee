const AuthActionType = {
  INITIALIZE: 'INITIALIZE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const initialState = {
  isAuthenticated: false,
  userAccessToken: null,
  isInitialized: false,
};

export { AuthActionType, initialState };
