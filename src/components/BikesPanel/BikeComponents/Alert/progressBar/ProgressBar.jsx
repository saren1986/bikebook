import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ProgressLine from '../../../../../UX/ProgressLine/ProgressLine';

const useStyles = makeStyles((theme) => ({
  alertInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    '& > *': {
      padding: '0 2px',
    },
  },
}));

const ProgressBar = ({
  startDistance, currentDistance, endDistance, remainDistance,
}) => {
  const classes = useStyles();
  const progress = ((currentDistance - startDistance) / (endDistance - startDistance)) * 100;

  return (
    <div className={classes.wrapper}>
      <div className={classes.alertInfo}>
        <span>Left: </span>
        <strong>{remainDistance}</strong>
      </div>
      <ProgressLine progress={progress} />
    </div>
  );
};

ProgressBar.propTypes = {
  startDistance: PropTypes.number.isRequired,
  currentDistance: PropTypes.number.isRequired,
  endDistance: PropTypes.number.isRequired,
  remainDistance: PropTypes.string.isRequired,
};

export default ProgressBar;
