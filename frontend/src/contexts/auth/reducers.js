import { AuthActionType } from './constant';

const reducerHandlers = {
  [AuthActionType.INITIALIZE]: (state, action) => {
    const { isAuthenticated, userAccessToken } = action.payload;
    return {
      ...state,
      isAuthenticated,
      userAccessToken,
      isInitialized: true,
    };
  },
  [AuthActionType.LOGIN]: (state, action) => {
    const { userAccessToken } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      userAccessToken,
    };
  },
  [AuthActionType.LOGOUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      userAccessToken: null,
    };
  },
};

export function reducer(state, action) {
  if (!reducerHandlers[action.type]) return state;
  return reducerHandlers[action.type](state, action);
}

// payload: { isAuthenticated: boolean, user: object, isInitialized: boolean }
function initialize(payload) {
  return {
    type: AuthActionType.INITIALIZE,
    payload,
  };
}

function login(payload) {
  return {
    type: AuthActionType.LOGIN,
    payload,
  };
}

function logout() {
  return {
    type: AuthActionType.LOGOUT,
  };
}

export { initialize, login, logout };
