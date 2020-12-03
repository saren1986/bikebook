import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
    '& .Mui-disabled': { opacity: 0.5 },
  },
}));
const Input = (props) => {
  const classes = useStyles();
  return (
    <TextField
      classes={{
        root: classes.textField,
      }}
      {...props}
    >
      {props.children}
    </TextField>
  );
};

export default Input;
