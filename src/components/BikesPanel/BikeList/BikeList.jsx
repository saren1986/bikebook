import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import classes from './BikeList.module.css';
import BikeTile from './BikeTile/BikeTile';
import BikeListControls from './BikeListControls/BikeListControls';
import Spinner from '../../../UX/Spinner/Spinner';

const BikeList = ({ bikeList, setActiveBike, modalOpenAddBike }) => {
  const renderedBikeList = bikeList ? bikeList
    .map((bike) => (
      <BikeTile
        key={bike.id}
        bike={bike}
        setActiveBike={() => setActiveBike(bike.id)}
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
      <BikeListControls modalOpenAddBike={modalOpenAddBike} />
    </>
  );
};

BikeList.propTypes = {
  bikeList: PropTypes.arrayOf(PropTypes.object),
  modalOpenAddBike: PropTypes.func.isRequired,
};
BikeList.defaultProps = {
  bikeList: null,
};

export default BikeList;
