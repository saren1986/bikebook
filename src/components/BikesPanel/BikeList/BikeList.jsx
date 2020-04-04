import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import classes from './BikeList.module.css';
import BikeTile from './BikeTile/BikeTile';
import BikeListControls from './BikeListControls/BikeListControls';
import Spinner from '../../../UX/Spinner/Spinner';
import * as actions from '../../../store/actions/index';

const BikeList = () => {
  const dispatch = useDispatch();
  const bikeList = useSelector((state) => state.bikes.list);
  const renderedBikeList = bikeList ? bikeList
    .map((bike) => (
      <BikeTile
        key={bike.id}
        bike={bike}
        setActiveBike={() => dispatch(actions.setActiveBike(bike.id))}
      />
    ))
    : <Spinner />;

  return (
    <>
      <div className={classes.wrapper}>
        <Grid container spacing={2}>
          {renderedBikeList}
        </Grid>
      </div>
      <BikeListControls />
    </>
  );
};

export default BikeList;
