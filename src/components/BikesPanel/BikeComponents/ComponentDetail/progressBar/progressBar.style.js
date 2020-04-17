import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  alertInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    '& > *': {
      padding: '0 2px',
    }
  },
}));

export default useStyles;
