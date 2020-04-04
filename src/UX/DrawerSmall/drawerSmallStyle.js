import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: '100%',
    minHeight: '100%',
    position: 'absolute',
    background: 'rgba(255, 255, 255, 1)',
    top: '0',
    right: '0',
    transform: 'translateX(110%)',
    padding: '15px',
    zIndex: theme.backdropZindex + 1,
  },
  close: {
    position: 'absolute',
    right: '15px',
    top: '15px',
  },

}));

export default useStyles;
