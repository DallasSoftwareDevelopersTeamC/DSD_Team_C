import React, { createContext, useContext } from "react";
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../services/authenticationAPIcalls';
import axios from 'axios'

export const AuthContext = createContext({
  toggleLogin: () => {},
  isLoggedIn: false,
  logOut: () => {},
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

  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const logOut = async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        toggleLogin();
        navigate("/login");
      } else {
        console.error('Failed to log out. Status:', response.status);
        console.error('Error message:', response.data);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  


  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleLogin, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
