import { AuthActionType } from './constant';

const reducerHandlers = {
  [AuthActionType.INITIALIZE]: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      user,
      isInitialized: true,
    };
  },
  [AuthActionType.LOGIN]: (state, action) => {
    const { user } = action.payload;
    localStorage.setItem('ACCESS_TOKEN', user.accessToken);
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [AuthActionType.LOGOUT]: (state) => {
    localStorage.removeItem('ACCESS_TOKEN');
    return {
      ...state,
      isAuthenticated: false,
      user: null,
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
