import React, { createContext, useContext } from "react";
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../services/authenticationAPIcalls';

export const AuthContext = createContext({
  toggleLogin: () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const {
    data: isLoggedIn,
    isError,
    error,
    refetch
  } = useQuery('validateToken', authenticateUser, {
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const toggleLogin = () => {
    refetch();
  };
  


  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleLogin}}>
      {children}
    </AuthContext.Provider>
  );
};
