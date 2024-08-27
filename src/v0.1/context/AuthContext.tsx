import React, { createContext, useState } from 'react';

interface IAuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const defaultValue: IAuthContext = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

export const AuthContext = createContext<IAuthContext>(defaultValue);

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(defaultValue.isLoggedIn);
  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
