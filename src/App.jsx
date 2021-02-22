import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './components/Layouts/MainLayout/Layout';
import BikesPanel from './components/BikesPanel/BikesPanel';
import { checkStravaAuth, initState, initAuth } from './store/actions/index';
import AuthPage from './pages/AuthPage';
import theme from './theme';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (isAuth) {
      dispatch(initState());
      dispatch(checkStravaAuth());
    } else {
      dispatch(initAuth(isAuth));
    }
  }, [isAuth]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          {isAuth
            ? (<BikesPanel />)
            : (<AuthPage />)}
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
