import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  textField: {
    width: '100%',
  },
  buttonWrapper: {
    textAlign: 'right',
    margin: '15px 0',
  },
  alertRow: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '50px',
    '@media (min-width: 780px)': {
      width: '100px',
    },
  },
});


export default useStyle;
