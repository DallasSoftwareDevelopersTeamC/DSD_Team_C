import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  logIn: () => {},
  logOut: () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // default to false

  useEffect(() => {
    // Validate token with server when component mounts
    (async function checkTokenValidity() {
      const isValid = await validateTokenWithServer();
      setIsLoggedIn(isValid);
    })();
  }, []);

  const logIn = () => {
    setIsLoggedIn(true);
  };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};


async function validateTokenWithServer() {
  try {
    // Check if the current access token is valid
    const response = await fetch('/authenticateUser', {
      credentials: 'include'
    });

    if (response.status === 403) {
      // If access token is invalid, try getting a new one using the refresh token
      const refreshResponse = await fetch('/token', { 
        credentials: 'include' 
      });
      
      if (refreshResponse.ok) {
        return true; // successfully refreshed the token
      } else {
        return false; // couldn't refresh the token
      }
    }

    return response.ok; 

  } catch (error) {
    console.error("Error checking token validity:", error);
    return false;
  }
}
