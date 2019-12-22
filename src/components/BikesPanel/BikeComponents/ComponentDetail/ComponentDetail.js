import React from 'react'
import classes from './ComponentDetail.module.css';
import ProgressBar from './progressBar/ProgressBar'

const ComponentDetail = ( { bikeComponent } ) => {

  let distanceAlert = null;

  if (bikeComponent.distanceAlert) {
  distanceAlert = <div className={classes.barProgressWrapper}>Distance progression: 
    <ProgressBar initialDistance={bikeComponent.initialDistance} currentDistance={bikeComponent.distance} alertDistance={bikeComponent.distanceAlert}/>
    </div>;
  }else{
    distanceAlert = <div className={classes.noAlert}>You have no set alarm for this component.</div>
  }
  if (bikeComponent.timeAlert) {
    distanceAlert = <div>Time progression: {bikeComponent.timeAlert}</div>;
    }
  return (
    <div className={classes.wrapper}>
      <div className={classes.left}>
      <ul>
        <li>Model: <span>{bikeComponent.model}</span></li>
        <li>Weight: <span>{bikeComponent.weight}</span></li>
        <li>On bike from: <span>{bikeComponent.startDate}</span></li>
      </ul>
      </div>
      <div className={classes.right}>
        {distanceAlert}
      </div>
      <div className={classes.description}>{bikeComponent.description}</div>
     
    </div>
  )
}

export default ComponentDetail
