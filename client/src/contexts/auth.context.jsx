import React, { createContext, useState, useEffect } from "react";
import { useQuery } from 'react-query';
import { authenticateUser } from '../services/authenticationAPIcalls';

export const AuthContext = createContext({
  isLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data: authenticatedUser } = useQuery(
    "validateToken",
    authenticateUser,
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (authenticatedUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authenticatedUser]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
