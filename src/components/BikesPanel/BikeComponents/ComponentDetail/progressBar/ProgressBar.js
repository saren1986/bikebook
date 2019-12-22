import React from 'react'
import classes from './ProgressBar.module.css'
import { distansFormatter } from '../../../../../helpers/helpers';

const ProgressBar = ( { initialDistance, currentDistance, alertDistance } ) => {
  
  let classesBar = [classes.bar];
  let classesLabelLeft = [classes.barLabels, classes.barLabelsRight];
  let progress = currentDistance / (alertDistance - initialDistance) * 100;
  if (progress >= 100) {
    progress = 100; 
    classesBar.push(classes.redBar)
    classesLabelLeft.push(classes.redColor)
  }
  return (
    <div className={classes.wrapper}>
      <span className={classes.barLabels}>{distansFormatter(initialDistance, 'KM')}</span>
      <div className={[classes.progressBar, classes.red].join(' ')}>
        <span className={classesBar.join(' ')} style={ {width: progress+'%' }}></span> 
      </div>
      <span className={classesLabelLeft.join(' ')}>{distansFormatter(alertDistance, 'KM')}</span>
      {/* <div>{progress}</div> */}
    </div>
    
  )
}

export default ProgressBar
