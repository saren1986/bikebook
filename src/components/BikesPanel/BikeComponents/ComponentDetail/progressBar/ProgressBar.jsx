import React from 'react';
import PropTypes from 'prop-types';
import BuildIcon from '@material-ui/icons/Build';
import useStyles from './progressBar.style';
import ProgressLine from '../../../../../UX/ProgressLine/ProgressLine';
import { formatDistance, remainDistance } from '../../../../../utils/distanceFormatters';

const ProgressBar = ({
  startDistance, currentDistance, endDistance, lengthUnit,
}) => {
  const classes = useStyles();
  const progress = ((currentDistance - startDistance) / (endDistance - startDistance)) * 100;
  const distanceLeft = remainDistance(startDistance, currentDistance, endDistance);
  let alertDescription = null;
  if (distanceLeft > 0) {
    alertDescription = (
      <>
        <strong>
          {formatDistance(distanceLeft, lengthUnit)}
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
          {formatDistance(Math.abs(distanceLeft), lengthUnit)}
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
  lengthUnit: PropTypes.string.isRequired,
};

export default ProgressBar;
