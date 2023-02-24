import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
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

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;