import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { makeStyles } from '@material-ui/core/styles';
import BuildIcon from '@material-ui/icons/Build';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { formatDistance } from '../../../../../utils/distanceFormatters';

const useStyles = makeStyles((theme) => ({
  msgWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  msgActiveLabel: {
    marginLeft: '5px',
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

const Message = ({ leftDistance, short }) => {
  const classes = useStyles();
  const { lengthUnit } = useSelector((state) => state.options.units);
  const distanceFormatted = formatDistance(leftDistance, lengthUnit);
  let message = '';
  if (leftDistance <= 0 && short) {
    message = (
      <div className={classes.msgWrapper}>
        <ErrorOutlineIcon classes={{
          root: classes.icon,
        }}
        />
        <span className={classes.msgActiveLabel}>Component needs action.</span>
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
  } else if (leftDistance <= 0) {
    message = (
      <div className={classes.msgWrapper}>
        <span className={classes.msgActiveLabelLong}>
          Alert was activated
          {' '}
          <strong>
            {formatDistance(Math.abs(leftDistance), lengthUnit)}
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
  } else if (leftDistance > 0) {
    message = (
      <div className={classes.msgWrapper}>
        <BuildIcon />
        <span>
          <strong>
            {formatDistance(leftDistance, lengthUnit)}
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
  leftDistance: PropTypes.number.isRequired,
  short: PropTypes.bool,
};
export default Message;
