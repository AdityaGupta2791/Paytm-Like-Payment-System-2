import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  let token = null;
  try {
    token = localStorage.getItem('token');
  } catch (e) {
    token = null;
  }

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
