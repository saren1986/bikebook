import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  controls: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  control: {
    margin: '0 5px',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    border: 'none',
    outline: 'none',
    '&:hover': {
      background: theme.hovers.icon,
    },
  },
  retired: {
    color: '#f00',
    width: '35%',
    [theme.breakpoints.up('sm')]: {
      order: '2',
    },
  },
}
));

export default useStyles;
