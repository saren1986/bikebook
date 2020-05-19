import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import BikesNav from './Navigation/Navigation';
import AddBike from './AddBike/AddBike';
import BikeItem from './BikeItem/BikeItem';
import ControlLayout from '../Layouts/ControlLayout/ControlLayout';
import BikeList from './BikeList/BikeList';
import Spinner from '../../UX/Spinner/Spinner';
import Strava from '../ServicesSync/Strava/Strava';
import Activities from './Activities/Activities';

import * as bikesData from '../../mock/constans';


const BikesPanel = () => {
  const bikeList = useSelector((state) => state.bikes.list);
  return (
    <ControlLayout>
      <BikesNav />
      {bikeList ? (
        <Switch>
          <Route path="/activities">
            <Activities />
          </Route>
          <Route path="/bike-list">
            <BikeList />
          </Route>
          <Route exact path="/bike/add">
            <AddBike />
          </Route>
          <Route exact path="/bike/edit">
            <AddBike edit />
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
