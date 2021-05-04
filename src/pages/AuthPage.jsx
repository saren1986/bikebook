import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignIn from '../components/Auth/SignIn/SignIn';
import Register from '../components/Auth/Register/Register';
import Confirm from '../components/Auth/Confirm/Confirm';

const useStyles = makeStyles((theme) => ({
  authInfoWrapper: {
    width: '100%',
    margin: '30px auto',
    textAlign: 'center',
    '& .error': {
      color: 'red',
    },
    '& .info': {
      color: 'green',
    },
  },
}));
const AuthPage = () => {
  const authError = useSelector((state) => state.auth.error);
  const authInfo = useSelector((state) => state.auth.info);
  const classes = useStyles();
  return (
    <>
      <div className={classes.authInfoWrapper}>
        <span className="error">{authError}</span>
        <span className="info">{authInfo}</span>
      </div>
      <Switch>
        <Route path="/auth/register">
          <Register />
        </Route>
        <Route path="/auth/confirm">
          <Confirm />
        </Route>
        <Route path="/auth">
          <SignIn />
        </Route>
      </Switch>
    </>
  );
};

export default AuthPage;
