import React from 'react';
import PropTypes from 'prop-types';
import classes from './ProgressBar.module.css';
import ProgressLine from '../../../../../UX/ProgressLine/ProgressLine';
import { format, meterToKm } from '../../../../../utils/distanceFormatters';

const ProgressBar = ({ startDistance, currentDistance, endDistance }) => {
  const progress = ((currentDistance - startDistance) / (endDistance - startDistance)) * 100;
  const distanceLeft = (endDistance - startDistance) - (currentDistance - startDistance);
  let alertDescription = null;
  if (distanceLeft > 0) {
    alertDescription = (
      <span>
        <strong>
          {format(meterToKm(distanceLeft), 'KM')}
          {' '}
        </strong>
        left to service alert.
      </span>
    );
  } else if (distanceLeft === 0) {
    alertDescription = (
      <strong>
        Alert is active!
      </strong>
    );
  } else {
    alertDescription = (
      <span>
        Alert was activated
        {' '}
        <strong>
          {format(meterToKm(Math.abs(distanceLeft)), 'KM')}
        </strong>
        {' '}
        ago!
      </span>
    );
  }
  return (
    <div className={classes.wrapper}>
      {alertDescription}
      <div className={classes.barWrapper}>
        <ProgressLine progress={progress} />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  startDistance: PropTypes.number.isRequired,
  currentDistance: PropTypes.number.isRequired,
  endDistance: PropTypes.number.isRequired,
};

export default ProgressBar;
