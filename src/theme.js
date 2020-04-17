import { createMuiTheme } from '@material-ui/core/styles';

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
    background: {
      default: '#f7f7fa',
    }
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

export default theme;
