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
    refetch(); // Refetch the authentication state when toggling login
  };

  if (isError) {
    if (error.message === 'TokenExpired') {
      // If the token is expired, redirect the user to the login page
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


async function validateTokenWithServer() {
  try {
    await authenticateUser();
    return true;
  } catch (error) {
    if (error.message === 'TokenExpired') {
      // Handle token expiry, maybe fetch a new token or redirect to login
      // For now, just logging out the user
      return false;
    } else if (error.message === 'AuthenticationError') {
      // Handle other authentication errors
      return false;
    } else {
      // Handle other unforeseen errors
      throw error;
    }
  }
}
