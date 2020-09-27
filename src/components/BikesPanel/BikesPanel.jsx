import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import BikesNav from './Navigation/Navigation';
import BikeForm from './BikeForm/BikeForm';
import BikeItem from './BikeItem/BikeItem';
import ControlLayout from '../Layouts/ControlLayout/ControlLayout';
import BikeList from './BikeList/BikeList';
import Spinner from '../../UX/Spinner/Spinner';
import Strava from '../ServicesSync/Strava/Strava';
import Activities from './Activities/Activities';
import ComponentForm from './BikeComponents/ComponentForm/ComponentForm';
import ActivityForm from './Activities/ActivityForm/ActivityForm';

const BikesPanel = () => {
  const bikeList = useSelector((state) => state.bikes.list);
  return (
    <ControlLayout>
      <BikesNav />
      {bikeList ? (
        <Switch>
          <Route path="/activity/add">
            <ActivityForm />
          </Route>
          <Route path="/activity/edit">
            <ActivityForm edit />
          </Route>
          <Route path="/activities">
            <Activities />
          </Route>
          <Route path="/bike-list">
            <BikeList />
          </Route>
          <Route exact path="/bike/add">
            <BikeForm />
          </Route>
          <Route exact path="/bike/edit">
            <BikeForm edit />
          </Route>
          <Route path="/component/add">
            <ComponentForm />
          </Route>
          <Route path="/component/edit">
            <ComponentForm edit />
          </Route>
          <Route path="/bike">
            <BikeItem />
          </Route>
          <Route path="/strava">
            <Strava />
          </Route>
          <Redirect exact from="/" to="/bike-list" />
        </Switch>
      ) : <Spinner />}
    </ControlLayout>
  );
};
export default BikesPanel;
