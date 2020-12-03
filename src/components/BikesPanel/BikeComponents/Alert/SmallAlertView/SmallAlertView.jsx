import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { formatDistance } from '../../../../../utils/distanceFormatters';

const useStyles = makeStyles((theme) => ({
  msgWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
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
  alertName: {
    display: 'block',
    marginTop: 10,
  },
  icon: {
    color: theme.palette.error.dark,
    marginBottom: 5,
  },
}));

const SmallAlertView = ({ alert, lengthUnit }) => {
  const classes = useStyles();
  let message = null;
  if (alert.requireAction) {
    message = (
      <div className={classes.msgWrapper}>
        <div className={classes.iconWrapper}>
          <ErrorOutlineIcon classes={{
            root: classes.icon,
          }}
          />
          <span className={classes.msgActiveLabel}>Require action</span>
        </div>

        <strong className={classes.alertName}>{alert.name}</strong>
      </div>
    );
  } else if (alert.distanceAlert) {
    const distanceFormatted = formatDistance(alert.remainDistance, lengthUnit);
    message = (
      <div className={classes.msgWrapper}>
        <span className={classes.msgLabel}>
          <strong>{distanceFormatted}</strong>
          {' '}
          left to:
        </span>
        <strong className={classes.alertName}>{alert.name}</strong>
      </div>
    );
  } else if (alert.dateAlert) {
    message = (
      <div className={classes.msgWrapper}>
        <span className={classes.msgLabel}>
          <strong>{alert.remainDays}</strong>
          {' '}
          days left to:
        </span>
        <strong className={classes.alertName}>{alert.name}</strong>
      </div>
    );
  }
  return (
    <div>
      {message}
    </div>
  );
};

SmallAlertView.propTypes = {
  lengthUnit: PropTypes.string.isRequired,
  alert: PropTypes.shape({
    dateAlert: PropTypes.bool.isRequired,
    distanceAlert: PropTypes.bool.isRequired,
    requireAction: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    note: PropTypes.string,
    remainDistance: PropTypes.number,
    remainDays: PropTypes.number,

  }).isRequired,
};
export default SmallAlertView;
