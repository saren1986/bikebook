import React from 'react'
import classes from './BikeTile.module.css'
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const BikeTile = ( { bike } ) => {
  return (
    <Grid item md={4}>
    <Link to={`/show-bike/${bike.id}`}>
    <div className={classes.wrapper}>
      <ul>
        <li>Distance: {bike.distance}</li>
        <li>Brand: {bike.brand_name}</li>
        <li>Model: {bike.model_name}</li>

      </ul>
    </div>
    </Link>
    </Grid>
  )
}

export default BikeTile
