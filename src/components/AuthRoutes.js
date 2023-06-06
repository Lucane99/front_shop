import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router';

const AuthRoutes = () => {
  const { user } = useSelector((store) => store.userInfo);

  const location = useLocation();
  return user === null ? <Navigate to='/user_login' state={{ form: location }} replace /> : <Outlet />
}

export default AuthRoutes
