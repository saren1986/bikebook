import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tabBar: {
    flexGrow: 1,
    backgroundColor: theme.backgroundColor.box,
    color: '#333',
    boxShadow: theme.shadows[2],
  },
  table: {
    borderRadius: '0',
  },
  tabSelected: {
    background: '#fff',
  },
  tabPanel: {
    '& .MuiPaper-root': {
      borderRadius: '0',
    },
  },
  tab: {
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
  }
}));

export default useStyles;
