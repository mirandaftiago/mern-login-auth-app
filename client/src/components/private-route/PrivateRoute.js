import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function PrivateRoute({ component: Component, isAuthenticated, onLogout, ...rest }) {
    return(
        <Routes>
            <Route
                {...rest}
                element={
                    isAuthenticated ? (
                        <Component onLogout={onLogout} />
                    ) : (
                        <Navigate to="/login" replace state={{ from: rest.location }} />
                    )
                }
            />
        </Routes>
    );
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);