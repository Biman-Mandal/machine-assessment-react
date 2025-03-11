import React, { createContext, useState, useEffect } from "react";

// Create Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const token = process.env.REACT_APP_VALID_URL_TOKEN;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated (based on localStorage token)
  const checkAuth = () => {
    const token = localStorage.getItem("auth_token");
    setIsAuthenticated(!!token); // Set true if token exists
  };

  useEffect(() => {
    checkAuth(); // Check on initial render
  }, []);

  // Login function
  const login = (token) => {
    localStorage.setItem("auth_token", token); // Save token to localStorage
    setIsAuthenticated(true); // Update state
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("auth_token"); // Remove token from localStorage
    setIsAuthenticated(false); // Update state
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
