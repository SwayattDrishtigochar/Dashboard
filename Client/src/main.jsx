import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import store from './store.js';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import OtpScreen from './screens/OtpScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './auth/PrivateRoute.jsx';
import AdminRoute from './auth/AdminRoute.jsx';
import DashboardScreen from './screens/DashboardScreen.jsx';
import DashboardRoute from './auth/DashboardRoute.jsx';
import PendingScreen from './screens/PendingScreen.jsx';
import AdminControlScreen from './screens/AdminControlScreen.jsx';
import PasswordResetScreen from './screens/PasswordResetScreen.jsx';
import ForgotPassword from './screens/ForgotPassword.jsx';
import Demo from './screens/core/Demo.jsx';

const theme = createTheme({});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/demo' element={<Demo />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route
        path='/password-reset/:userId/:token'
        element={<PasswordResetScreen />}
      />
      <Route path='/otp' element={<OtpScreen />} />
      <Route path='/forget-password' element={<ForgotPassword />} />
      <Route path='/company' element={<AdminControlScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/pending' element={<PendingScreen />} />
        <Route path='' element={<DashboardRoute />}>
          <Route path='/dash' element={<DashboardScreen />} />
        </Route>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      <Route path='' element={<AdminRoute />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>
);
