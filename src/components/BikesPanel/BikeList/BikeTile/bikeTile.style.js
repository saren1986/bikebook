import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: '1px solid #ccc',
    padding: '15px',
    minHeight: '200px',
    display: 'block',
    textDecoration: 'none',
    textAlign: 'center',
    width: '100%',
    cursor: 'pointer',
    '&:active':
      { color: 'inherit' },
  },
  name: {
    fontWeight: 'bold',
  },
  top: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column',
    '&> span': { display: 'block', margin: '10px 0' },
  },
}));

export default useStyles;
