import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';


import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';

// Check for token in order to keep the user logged in
if(localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  // Date in millisecconds
  const currentTime = Date.now() / 1000; 
  
  if(decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = './login';
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // perform login operation
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // perform logout operation
    setIsLoggedIn(false);
  };

  return (
    <Provider store={store}>
        <div className='App'>
          <Navbar />
          <Routes>
              <Route exact path='/' element={<Landing />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
              <Route
                path="/dashboard/*"
                element={
                  <PrivateRoute
                    component={Dashboard}
                    onLogout={handleLogout}
                    isAuthenticated={isLoggedIn}
                  />
                }
              />
          </Routes>
        </div>
    </Provider>
  );
}

export default App;