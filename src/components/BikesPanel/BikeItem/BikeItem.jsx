import React, { useEffect } from 'react';
import {
  Route, withRouter, Redirect, Switch,
} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import BikeComponents from '../BikeComponents/BikeComponents';
import * as actions from '../../../store/actions/index';
import ComponentDetail from '../BikeComponents/ComponentDetail/ComponentDetail';
import BikeInfo from '../BikeInfo/BikeInfo';

const useStyles = makeStyles((theme) => ({
  title: { textAlign: 'center' },
  bikeItemHeader: {
    borderBottom: '1px solid #f5f5f5',
    paddingBottom: '10px',
    justifyContent: 'center',
  },
  topInfo: { textAlign: 'right' },
  bikeItemView: { marginBottom: '15px' },
}));

const BikeItem = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const bikeId = useSelector((state) => state.options.activeBike);
  const bike = useSelector((state) => state.bikes.find((elem) => elem.id === bikeId));
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
              bike={bike}
            />
          </Route>
          <Route path={[`${match.path}/info`, `${match.path}`]}>
            <BikeInfo bike={bike} />
          </Route>
        </Switch>
      </div>
    </div>
  ) : <Redirect to="/" />;

  return renderBikeItem;
};

export default withRouter(BikeItem);
