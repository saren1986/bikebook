import React from 'react';
import classes from './ProgressBar.module.css';
import { format, meterToKm } from '../../../../../utils/distanceFormatters';

const ProgressBar = ( { initialDistance, currentDistance, alertDistance } ) => {

  const classesBar = [classes.bar];
  const classesLabelLeft = [classes.barLabels, classes.barLabelsRight];
  let progress = (currentDistance / (alertDistance - initialDistance)) * 100;
  const remainingDistance = format(meterToKm(alertDistance - currentDistance), 'KM');

  if (progress >= 100) {
    progress = 100;
    classesBar.push(classes.redBar)
    classesLabelLeft.push(classes.redColor)
  }
  initialDistance = format(meterToKm(initialDistance), 'KM');
  alertDistance = format(meterToKm(alertDistance, 'KM'));
  return (
    <div className={classes.wrapper}>
      <span>
        {remainingDistance} 
        left
      </span>
      <div className={classes.barWrapper}>
        <span className={classes.barLabels}>{initialDistance}</span>
        <div className={[classes.progressBar, classes.red].join(' ')}>
          <span className={classesBar.join(' ')} style={ {width: progress + '%' }}></span>
        </div>
        <span className={classesLabelLeft.join(' ')}>{alertDistance}</span>
      </div>
    </div>
  )
}

export default ProgressBar
