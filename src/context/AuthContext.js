// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component that wraps your app and makes auth object available
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  // Function to log in the user
  const login = async (username, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setAuthToken(data.token);
      localStorage.setItem('authToken', data.token);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Function to log out the user
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
