import React, { createContext, useState, useContext } from 'react';

interface AuthContextType {
  username: string;
  isAuth: boolean;
  isDemo: boolean;
  setAuth: (username: string, isAuth: boolean, isDemo: boolean) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({
  username: '',
  isAuth: false,
  isDemo: false,
  setAuth: () => {},
  clearAuth: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  const setAuth = (username: string, isAuth: boolean, isDemo: boolean) => {
    setUsername(username);
    setIsAuth(isAuth);
    setIsDemo(isDemo);
  };

  const clearAuth = () => {
    setUsername('');
    setIsAuth(false);
    setIsDemo(false);
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        isAuth,
        isDemo,
        setAuth,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
