import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    margin: '0 auto',
    padding: 30,
    maxWidth: 550,
  },
}));
const StyledAuthForm = ({ children }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.formWrapper} elevation={1}>
      {children}
    </Paper>
  );
};

export default StyledAuthForm;
