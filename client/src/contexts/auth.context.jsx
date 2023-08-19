import React, { createContext, useState, useEffect } from "react";
import { useQuery } from 'react-query';
import { authenticateUser } from '../services/authenticationAPIcalls';

export const AuthContext = createContext({
  toggleLogin: () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    data: authenticatedUser,
    refetch,
  } = useQuery('validateToken', authenticateUser, {
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const toggleLogin = () => {
    refetch();
  };

  useEffect(() => {
    if (authenticatedUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authenticatedUser]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, toggleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
