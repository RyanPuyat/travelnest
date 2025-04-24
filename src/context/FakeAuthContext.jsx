import { createContext, useContext, useReducer } from 'react';
import FakeAuthReducer from './FakeAuthReducer';
import { ACTION } from './Action';

const AuthContext = createContext();

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthContextProvider({ children }) {
  const InitialState = {
    user: null,
    isAuthenticated: false,
    emailAuth: 'jack@example.com',
    passwordAuth: 'qwerty',
  };

  const [state, dispatch] = useReducer(FakeAuthReducer, InitialState);

  const { user, isAuthenticated, emailAuth, passwordAuth } = state;

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: ACTION.LOGIN,
        payload: FAKE_USER,
      });
    } else {
      alert('Invalid username and password');
    }
  }

  function logout() {
    dispatch({
      type: ACTION.LOGOUT,
    });
  }

  const value = {
    user,
    isAuthenticated,
    emailAuth,
    passwordAuth,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was use outside the AuthProvider');
  return context;
}

export { AuthContextProvider, useAuth };
