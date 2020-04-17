import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Layout from './components/Layouts/MainLayout/Layout';
import BikesPanel from './components/BikesPanel/BikesPanel';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Layout>
        <BikesPanel />
      </Layout>
    </Router>
  </ThemeProvider>
);

export default App;
