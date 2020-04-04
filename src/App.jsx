import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import 'typeface-roboto';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Layout from './components/Layouts/MainLayout/Layout';
import BikesPanel from './components/BikesPanel/BikesPanel';

const theme = createMuiTheme({
  hovers: {
    icon: '#ccc',
  },
  backdropZindex: 999,
  backgroundColor: {
    box: '#eee',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  typography: {
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: '#fc4c02',
    },
  },
  overrides: {
    MuiFormControl: {
      marginNormal: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Layout>
        <BikesPanel />
      </Layout>
    </Router>
  </ThemeProvider>
);


export default App;
