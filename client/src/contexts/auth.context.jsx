import React, { createContext } from "react";
import { useQuery } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
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

  if (isError) {
    if (error.message === 'TokenExpired') {
      navigate("/login");
    } else {
      console.error("Error checking token validity:", error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};


