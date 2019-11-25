import React from 'react'
import Button from '@material-ui/core/Button';
import classes from './BikeListControls.module.css'

const BikeListControls = ( { modalOpenAddBike } ) => {
  return (
    <div className={classes.wrapper}>
      <Button variant="outlined" color="primary" onClick={modalOpenAddBike}>
        Add new bike
      </Button>
    </div>
  )
}

export default BikeListControls
