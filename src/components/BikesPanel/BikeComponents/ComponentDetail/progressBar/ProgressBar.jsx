import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './progressBar.style';
import ProgressLine from '../../../../../UX/ProgressLine/ProgressLine';
import { remainDistance } from '../../../../../utils/distanceFormatters';
import AlertMessage from '../../Alert/Message/Message';

const ProgressBar = ({
  startDistance, currentDistance, endDistance, lengthUnit,
}) => {
  const classes = useStyles();
  const progress = ((currentDistance - startDistance) / (endDistance - startDistance)) * 100;
  const distanceLeft = remainDistance(startDistance, currentDistance, endDistance);
  return (
    <div className={classes.wrapper}>
      <div className={classes.alertInfo}>
        <AlertMessage remainDistance={distanceLeft} lengthUnit={lengthUnit}/>
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
