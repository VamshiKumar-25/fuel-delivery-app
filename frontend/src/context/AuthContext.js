import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Define the API URL based on the environment
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://fuel-delivery-app.onrender.com' // Live backend URL
  : 'http://localhost:5001'; // Local development backend URL

// Create a configured axios instance for our API
const api = axios.create({
  baseURL: API_URL,
});

// Use an interceptor to automatically add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState(null);

  // Effect to load user data if a token exists on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/users/login', {
        email,
        password,
      });

      if (response.data) {
        setUser(response.data);
        setToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', response.data.token);
        setError(null);
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
      return false;
    }
  };

  // Function to update user state after profile edit
  const updateAuthUser = (updatedUserData) => {
    setUser(updatedUserData);
    setToken(updatedUserData.token);
    localStorage.setItem('user', JSON.stringify(updatedUserData));
    localStorage.setItem('token', updatedUserData.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, error, login, logout, updateAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Export the configured api instance to be used in other files
export default api;