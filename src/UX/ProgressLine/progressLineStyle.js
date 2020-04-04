import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  progressBar: {
    width: '100%',
    height: '12px',
    position: 'relative',
    background: '#ccc',
    MozBorderRadius: '25px',
    WebkitBorderRadius: '25px',
    borderRadius: '25px',
    padding: '4px',
  },
  bar: {
    display: 'block',
    height: '100%',
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    backgroundColor: '#fc4c02',
    position: 'relative',
    overflow: 'hidden',
    background: theme.palette.primary.main,
  },

}));

export default useStyles;
