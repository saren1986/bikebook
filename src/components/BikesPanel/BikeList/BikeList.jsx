import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './BikeList.module.css';
import BikeTile from './BikeTile/BikeTile';
import BikeListControls from './BikeListControls/BikeListControls';
import Spinner from '../../../UX/Spinner/Spinner';
import * as actions from '../../../store/actions/index';

const BikeList = ({ history }) => {
  const dispatch = useDispatch();
  const bikeList = useSelector((state) => state.bikes.list);
  const bikeClickHandler = (bikeId) => () => {
    dispatch(actions.setActiveBike(bikeId));
    history.push('/bike');
  };

  const renderedBikeList = bikeList ? bikeList
    .map((bike) => (
      <BikeTile
        key={bike.id}
        bike={bike}
        click={bikeClickHandler(bike.id)}
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

BikeList.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(BikeList);
