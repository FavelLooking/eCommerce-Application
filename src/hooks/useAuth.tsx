import React, { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import { storageIsLogined } from '../utils/constants';

type AuthContextType = {
  user: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState(
    !!AuthService.getFromLocalStorage(storageIsLogined)
  );
  const navigate = useNavigate();

  const login = () => {
    setUser(true);
    AuthService.saveToLocalStorage(storageIsLogined, 'logined');
    navigate('/');
  };

  const logout = () => {
    setUser(false);
    AuthService.removeFromLocalStorage(storageIsLogined);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
