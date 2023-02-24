import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ element: Element, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  return isAuthenticated ? (
    <Route {...rest} element={<Element />} />
  ) : (
    navigate('/', { replace: true})
  );
}

export default PrivateRoute;