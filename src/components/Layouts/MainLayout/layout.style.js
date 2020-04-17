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
    marginTop: '50px',
  }
}));

export default useStyles;
