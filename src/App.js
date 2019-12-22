import React from 'react';
import './App.css'
import 'typeface-roboto';
import Layout from './components/Layouts/MainLayout/Layout';
import BikesPanel from './components/BikesPanel/BikesPanel';
import { ThemeProvider, createMuiTheme  } from '@material-ui/core/styles';

// const theme = {
//   // overrides: {
//   // }
// };
const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 500,
    }
  },
  palette: {
    primary: {
      main: '#fc4c02',
    }
  }
});


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <BikesPanel/>
      </Layout>
    </ThemeProvider>
  )
}


export default App

