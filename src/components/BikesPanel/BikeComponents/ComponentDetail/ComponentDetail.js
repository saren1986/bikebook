import React, { useEffect } from 'react'
import classes from './ComponentDetail.module.css';
import ProgressBar from './progressBar/ProgressBar'
import ComponentControls from './ComponentControls/ComponentControls'
import SetAlert from '../SetAlert/SetAlert';
import Grid from '@material-ui/core/Grid';

const ComponentDetail = ( { bikeComponent, setDistanceAlert } ) => {

  useEffect(()=>{
    console.log('bikeComponent: ' , bikeComponent)
  },[])


  let distanceAlert = null;
  if (bikeComponent.distanceAlert) {
    distanceAlert = <ProgressBar initialDistance={bikeComponent.initialDistance} currentDistance={bikeComponent.distance} alertDistance={bikeComponent.distanceAlert} />;
  }else{
    distanceAlert = 
      <div className={classes.noAlert}>
        <SetAlert id={bikeComponent.id} setDistanceAlert={setDistanceAlert} />
      </div>
  }
  if (bikeComponent.timeAlert) {
    distanceAlert = <div>Time progression: {bikeComponent.timeAlert}</div>;
    }
  return (
    <div className={classes.wrapper}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div className={classes.componentControls}>
            <ComponentControls />
          </div>
        </Grid>
        <Grid item xs={4}>
          <ul>
            <li>Model: <span>{bikeComponent.model}</span></li>
            <li>Weight: <span>{bikeComponent.weight}</span></li>
            <li>On bike from: <span>{bikeComponent.startDate}</span></li>
          </ul>
        </Grid>
        <Grid item xs={6}>
         {distanceAlert}
        </Grid>
        <Grid item xs={12}>
          <hr></hr>
          <p><b>Description: </b>{bikeComponent.model}</p>
        </Grid>
      </Grid>
    </div>

  )
}
export default ComponentDetail
