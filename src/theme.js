import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  hovers: {
    icon: '#ccc',
  },
  backdropZindex: 999,
  backgroundColor: {
    box: '#f7f7f7',
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
      main: '#8c3d1c',
    },
    background: {
      default: '#f7f7fa',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
        html: {
          overflow: 'scroll',
        },
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
  },
});

export default theme;
