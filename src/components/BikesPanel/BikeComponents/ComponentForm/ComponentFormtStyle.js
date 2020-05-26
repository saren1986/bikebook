import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
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
