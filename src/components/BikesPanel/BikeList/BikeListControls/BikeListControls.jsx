import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import classes from './BikeListControls.module.css';

const BikeListControls = ({ modalOpenAddBike }) => {
  return (
    <div className={classes.wrapper}>
      <Button variant="outlined" color="primary" onClick={modalOpenAddBike}>
        Add new bike
      </Button>
      {/* <Button variant="outlined" color="primary">
        Import from Strava
      </Button> */}
    </div>
  )
};

BikeListControls.propTypes = {
  modalOpenAddBike: PropTypes.func.isRequired,
};

export default BikeListControls;
