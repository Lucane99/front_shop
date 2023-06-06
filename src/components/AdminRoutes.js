import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router';

const AdminRoutes = () => {
  const { user } = useSelector((store) => store.userInfo);

  const location = useLocation();
  return user === null ? <Navigate to='/user_login' state={{ form: location }} replace /> : user.isAdmin ? <Outlet /> : <h1>You are not authorised</h1>
}

export default AdminRoutes
