import React from 'react'
import useAuth from '../../features/Auth/hooks/useAuth';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const { user , loading } = useAuth();
  if(loading){
    return null;
  }
  
  if (user.role !== 'admin') {
    return <Navigate to="/users" replace />;
  }

  return children;
}

export default AdminRoute