import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Layout from './components/Layouts/MainLayout/Layout';
import BikesPanel from './components/BikesPanel/BikesPanel';
import { checkStravaAuth } from './store/actions/index';
import theme from './theme';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkStravaAuth());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <BikesPanel />
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
