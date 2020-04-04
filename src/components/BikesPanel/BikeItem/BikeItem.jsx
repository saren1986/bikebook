import React, { useEffect } from 'react';
import {
  Route, withRouter, Redirect, Switch,
} from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import BikeComponents from '../BikeComponents/BikeComponents';
import AddComponent from '../BikeComponents/AddComponent/AddComponent';
import classes from './BikeItem.module.css';
import { meterToKm, format } from '../../../utils/distanceFormatters';
import * as actions from '../../../store/actions/index';
import * as data from '../../../mock/constans';
import AddDistance from '../AddDistance/AddDistance';
import ComponentDetail from '../BikeComponents/ComponentDetail/ComponentDetail';


const BikeItem = ({ match }) => {
  const dispatch = useDispatch();
  const bikeId = useSelector((state) => state.bikes.activeBike);
  const bike = useSelector((state) => state.bikes.list.find((elem) => elem.id === bikeId));
  useEffect(() => () => dispatch(actions.setActiveBike(null)), []);

  const renderBikeItem = bikeId ? (
    <div className={classes.wrapper}>
      <div className={classes.bikeItemHeader}>
        <Typography
          variant="h2"
          component="h2"
          className={classes.title}
        >
          {bike.name}
        </Typography>
        <div className={classes.topInfo}>
          <div className={classes.topInfoItem}>
            <span>
              Distance:
              <strong>{format(meterToKm(bike.distance), 'km')}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className={classes.bikeItemView}>
        <Switch>
          <Route path={`${match.path}/components/add`}>
            <AddComponent
              componentsTypes={data.COMPONENT_TYPES}
              componentStartDate={data.COMPONENT_START_DATE}
            />
          </Route>
          <Route path={`${match.path}/components/detail`}>
            <ComponentDetail
              components={bike.components}
            />
          </Route>
          <Route path={`${match.path}/components`}>
            <BikeComponents
              components={bike.components}
            />
          </Route>
          <Route exact path={`${match.path}/add-distance`}>
            <AddDistance />
          </Route>
          <Redirect exact from="/bike" to={`${match.path}/components`} />
        </Switch>
      </div>
    </div>
  ) : <Redirect to="/" />;

  return renderBikeItem;
};

export default withRouter(BikeItem);
