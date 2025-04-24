import { ACTION } from './Action';

function FakeAuthReducer(state, action) {
  switch (action.type) {
    case ACTION.LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case ACTION.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

export default FakeAuthReducer;
