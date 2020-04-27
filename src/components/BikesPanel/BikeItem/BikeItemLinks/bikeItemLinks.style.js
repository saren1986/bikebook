import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navHeader: {
    textAlign: 'center',
    padding: '10px 0',
    fontWeight: 'bold',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  subheader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  }
}));

export default useStyles;
