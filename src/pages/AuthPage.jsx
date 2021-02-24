import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Auth from '../components/Auth/Auth';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    margin: '0 auto',
    background: '#ccc',
    padding: 30,
  },

}));
const AuthPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.formWrapper}>
      <Auth />
    </div>
  );
};

export default AuthPage;
