import React, { useEffect } from 'react';
import {
  Route, withRouter, Redirect, Switch,
} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import BikeComponents from '../BikeComponents/BikeComponents';

import useStyles from './bikeItem.style';

import * as actions from '../../../store/actions/index';
import AddDistance from '../AddDistance/AddDistance';
import ComponentDetail from '../BikeComponents/ComponentDetail/ComponentDetail';
import BikeInfo from '../BikeInfo/BikeInfo';

const BikeItem = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { lengthUnit } = useSelector((state) => state.user.units);
  const bikeId = useSelector((state) => state.bikes.activeBike);
  const bike = useSelector((state) => state.bikes.list.find((elem) => elem.id === bikeId));
  const components = useSelector((state) => state.components
    .filter((comp) => comp.bikeId === bikeId));
  useEffect(() => () => dispatch(actions.setActiveBike(null)), []);

  const renderBikeItem = bikeId ? (
    <div className={classes.wrapper}>
      <div className={classes.bikeItemView}>
        <Switch>
          <Route path={`${match.path}/components/detail`}>
            <ComponentDetail
              components={components}
            />
          </Route>
          <Route path={`${match.path}/components`}>
            <BikeComponents
              components={components}
            />
          </Route>
          <Route path={[`${match.path}/info`, `${match.path}`]}>
            <BikeInfo bike={bike} />
          </Route>
          <Route exact path={`${match.path}/add-distance`}>
            <AddDistance
              bikeId={bikeId}
              lengthUnit={lengthUnit}
            />
          </Route>
          {/* <Redirect exact from="/bike" to={`${match.path}/components`} /> */}
        </Switch>
      </div>
    </div>
  ) : <Redirect to="/" />;

  return renderBikeItem;
};

export default withRouter(BikeItem);
