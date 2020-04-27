import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { makeStyles } from '@material-ui/core/styles';
import BuildIcon from '@material-ui/icons/Build';
import PropTypes from 'prop-types';
import { formatDistance } from '../../../../../utils/distanceFormatters';

const useStyles = makeStyles((theme) => ({
  msgWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  msgActiveLabel: {
    marginRight: '5px',
    color: theme.palette.error.dark,
  },
  msgActiveLabelLong: {
    marginRight: '5px',
    '& strong': {
      color: theme.palette.error.dark,
    },

  },
  icon: {
    color: theme.palette.error.dark,
  },
}));

const Message = ({ remainDistance, lengthUnit, short }) => {
  const classes = useStyles();
  const distanceFormatted = formatDistance(remainDistance, lengthUnit);
  let message = '';
  if (remainDistance <= 0 && short) {
    message = (
      <div className={classes.msgWrapper}>
        <span className={classes.msgActiveLabel}>Alert activated</span>
        <ErrorOutlineIcon classes={{
          root: classes.icon,
        }}
        />
      </div>
    );
  } else if (short) {
    message = (
      <div className={classes.msgWrapper}>
        <span className={classes.msgLabel}>
          <strong>{distanceFormatted}</strong>
          {' '}
          left
        </span>
      </div>
    );
  } else if (remainDistance <= 0) {
    message = (
      <div className={classes.msgWrapper}>
        <span className={classes.msgActiveLabelLong}>
          Alert was activated
          {' '}
          <strong>
            {formatDistance(Math.abs(remainDistance), lengthUnit)}
          </strong>
          {' '}
          ago
        </span>
        <ErrorOutlineIcon classes={{
          root: classes.icon,
        }}
        />
      </div>
    );
  } else if (remainDistance > 0) {
    message = (
      <div className={classes.msgWrapper}>
        <BuildIcon />
        <span>
          <strong>
            {formatDistance(remainDistance, lengthUnit)}
            {' '}
          </strong>
          left to service alert.
        </span>
      </div>
    );
  }
  return message;
};
Message.propTypes = {
  remainDistance: PropTypes.number.isRequired,
  lengthUnit: PropTypes.string.isRequired,
  short: PropTypes.bool,
};
export default Message;
