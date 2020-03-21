import React, { useEffect } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import BikeComponents from '../BikeComponents/BikeComponents';
import classes from './BikeItem.module.css';
import { meterToKm, format } from '../../../utils/distanceFormatters';


const BikeItem = ({
  bike, addComponent, setActiveBikeId, setDistanceAlert, location, match,
}) => {

  if (bike) {
    setActiveBikeId(bike.id);
  }
  useEffect(() => () => {
    setActiveBikeId(null);
  }, []);
  const renderBikeItem = bike ? (
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
        <Route
          path={`${match.path}/components`}
        >
          <BikeComponents
            components={bike.components}
            addComponent={addComponent}
            setDistanceAlert={setDistanceAlert}
          />
        </Route>
      </div>
    </div>
  ) : <Redirect to="/" />;

  return renderBikeItem;
};

export default withRouter(BikeItem);
