import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './progressLineStyle';

const ProgressLine = ({ progress }) => {
  const classes = useStyles();
  let progreesNbr = progress;

  if (progreesNbr >= 100) {
    progreesNbr = 100;
  }
  return (
    <div className={classes.progressBar}>
      <span className={classes.bar} style={{ width: `${progreesNbr}%` }} />
    </div>
  );
};

ProgressLine.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressLine;
