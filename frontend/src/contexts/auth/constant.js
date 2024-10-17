const AuthActionType = {
  INITIALIZE: 'INITIALIZE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const initialState = {
  isAuthenticated: false,
  user: null,
  isInitialized: false,
};

export { AuthActionType, initialState };
