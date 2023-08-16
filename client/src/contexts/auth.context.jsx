import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  logIn: () => {},
  logOut: () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn") || "false");
  });

  const logIn = () => {
    console.log("here");
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
