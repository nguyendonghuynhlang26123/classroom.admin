import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { PrivateRoutesProps } from './type';

export function PrivateRoute({ children, redirect, isAuthenticated, ...rest }: PrivateRoutesProps) {
  let location = useLocation();
  const ele = isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;

  return <Route {...rest} element={ele} />;
}
