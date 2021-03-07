import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './components/Layouts/MainLayout/Layout';
import BikesPanel from './components/BikesPanel/BikesPanel';
import {initState, initAuth, getUser } from './store/actions/index';
import AuthPage from './pages/AuthPage';
import theme from './theme';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.accessToken);
  if (!isAuth) {
    dispatch(initAuth(isAuth));
  }

  useEffect(() => {
    if (isAuth) {
      dispatch(getUser());
      dispatch(initState());
    }
  }, [isAuth]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          {/* TODO: USE ROUTER REDIRECT TO AUTH PAGE */}
          {isAuth
            ? (<BikesPanel />)
            : (<AuthPage />)}
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
