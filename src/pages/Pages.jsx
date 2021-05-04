import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import BikesPanel from '../components/BikesPanel/BikesPanel';
import AuthPage from './AuthPage';

const Pages = () => (
  <>
    <Switch>
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Route path="/">
        <BikesPanel />
      </Route>
    </Switch>
  </>
);

export default Pages;
