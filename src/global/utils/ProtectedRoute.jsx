import React from 'react'
import useAuth from '../../features/Auth/hooks/useAuth';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user , loading } = useAuth();
  if(loading){
    return null;
  }
  if(!user){
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute