import React from 'react';
import PropTypes from 'prop-types';
import BuildIcon from '@material-ui/icons/Build';
import useStyles from './progressBar.style';
import ProgressLine from '../../../../../UX/ProgressLine/ProgressLine';
import { format, meterToKm } from '../../../../../utils/distanceFormatters';

const ProgressBar = ({ startDistance, currentDistance, endDistance }) => {
  const classes = useStyles();
  const progress = ((currentDistance - startDistance) / (endDistance - startDistance)) * 100;
  const distanceLeft = (endDistance - startDistance) - (currentDistance - startDistance);
  let alertDescription = null;
  if (distanceLeft > 0) {
    alertDescription = (
      <>
        <strong>
          {format(meterToKm(distanceLeft), 'KM')}
          {' '}
        </strong>
        <span>left to service alert.</span>
      </>
    );
  } else if (distanceLeft === 0) {
    alertDescription = (
      <>
        <strong>Alert is active!</strong>
      </>
    );
  } else {
    alertDescription = (
      <>
        <span>Alert was activated</span>
        {' '}
        <strong>
          {format(meterToKm(Math.abs(distanceLeft)), 'KM')}
        </strong>
        {' '}
        <span> ago!</span>
      </>
    );
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.alertInfo}>
        <BuildIcon />
        {alertDescription}
      </div>
      <ProgressLine progress={progress} />
    </div>
  );
};

ProgressBar.propTypes = {
  startDistance: PropTypes.number.isRequired,
  currentDistance: PropTypes.number.isRequired,
  endDistance: PropTypes.number.isRequired,
};

export default ProgressBar;
