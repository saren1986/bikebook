import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  TopBar: {
    width: '100%',
    height: '50px',
    background: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
  },
  MainContainer: {
    marginTop: '15px',
    // padding: '0',
    [theme.breakpoints.up('md')]: {
      marginTop: '50px',
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    width: '50%',
    [theme.breakpoints.up('md')]: {
      width: '25%',
    },
  },
  right: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('md')]: {
      width: '75%',
    },
    '& > *': {
      marginLeft: '10px',
    },
  }
}));

export default useStyles;
