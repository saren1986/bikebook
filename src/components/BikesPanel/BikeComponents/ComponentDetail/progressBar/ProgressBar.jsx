import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './progressBar.style';
import ProgressLine from '../../../../../UX/ProgressLine/ProgressLine';
import { remainDistance } from '../../../../../utils/distanceFormatters';
import AlertMessage from '../../Alert/Message/Message';

const ProgressBar = ({
  startDistance, currentDistance, endDistance,
}) => {
  const classes = useStyles();
  const progress = ((currentDistance - startDistance) / (endDistance - startDistance)) * 100;
  const leftDistance = remainDistance(startDistance, currentDistance, endDistance);
  return (
    <div className={classes.wrapper}>
      <div className={classes.alertInfo}>
        <AlertMessage leftDistance={leftDistance} />
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
