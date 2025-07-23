import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  // If user is loaded and is an admin, show the page.
  if (user && user.role === 'admin') {
    return children;
  }

  // If user is loaded but not an admin, redirect to dashboard.
  if (user && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  
  // If user is not loaded yet, or no user, redirect to login.
  return <Navigate to="/login" />;
};

export default AdminRoute;