import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: '10px',
    background: theme.backgroundColor.box,
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      padding: '20px',
    },
  },
  topBar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '15px',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
      marginBottom: '0',
    },
    '& > div': {
      [theme.breakpoints.up('sm')]: {
        width: '33%',
      },
    },
  },
  compTypeLabel: {
    order: '2',
    display: 'inline-flex',
    marginRight: '15px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginRight: '0',
    },
  },
  label: {
    order: '2',
    textAlign: 'center',
    display: 'inline-flex',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    '& span': {
      margin: '0 5px',
    },
  },
  compItem: {
    margin: '10px 0',
  },

  componentControls: {
    order: '1',
    display: 'flex',
    justifyContent: 'flex-end',
    flexBasis: '100%',
    marginBottom: '15px',
    [theme.breakpoints.up('sm')]: {
      order: '2',
      flexBasis: '33%',
      marginBottom: '0',
    },
  },
}));

export default useStyles;
