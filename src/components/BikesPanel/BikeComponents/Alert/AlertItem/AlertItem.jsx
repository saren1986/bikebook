import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplayIcon from '@material-ui/icons/Replay';
import Button from '@material-ui/core/Button';
import BuildIcon from '@material-ui/icons/Build';
import { useDispatch } from 'react-redux';
import ProgressBar from '../progressBar/ProgressBar';
import { formatDistance } from '../../../../../utils/distanceFormatters';
import { deleteAlert, serviceComponent } from '../../../../../store/actions/index';
import { timeFormatter } from '../../../../../utils/timeFormatters';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px 15px',
    marginBottom: 5,
    background: '#fff',
    borderColor: (props) => (props.activated ? 'red' : '#C8C8C8'),
  },
  alertInfos: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  topInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    '&:not(:first-child)': {
      '&::before': {
        [theme.breakpoints.up('sm')]: {
          content: '"|"',
          marginRight: 10,
        },
      },
      [theme.breakpoints.up('sm')]: {
        marginLeft: 10,
      },
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },

  },
  repeatIcon: {
    marginRight: 5,
  },
  topWithMargin: {
    marginTop: '-20px',
    marginBottom: '-20px',
  },
  title: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    marginBottom: 10,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },
  },
  activitieControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  content: {
    marginTop: 10,
  },
  confirmationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& > strong': {
      color: 'red',
      textTransform: 'uppercase',
    },
    '&  .MuiSvgIcon-root': {
      marginRight: 5,
    },
  },
  gridItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  deleteIcon: {
    padding: 5,
  },
}));

const AlertItem = ({
  alert, lengthUnit, componentDistance, componentId,
}) => {
  const classes = useStyles({ activated: alert.requireAction });
  const dispatch = useDispatch();
  const serviceClickHandler = () => {
    dispatch(serviceComponent({
      alertId: alert.id,
      componentId,
    }));
  }
  const deleteHandler = () => {
    dispatch(deleteAlert({
      alertId: alert.id,
      componentId,
    }));
  };
  let setOn = null;
  let progressInfo = null;
  let confirmAction = null;
  let repeatInfo = null;
  if (alert.dateAlert) {
    setOn = timeFormatter(alert.endDate, false);
    if (alert.repeat) {
      repeatInfo = `${alert.repeatedPeriod} days`;
    }
  } else if (alert.distanceAlert) {
    setOn = formatDistance(alert.endDistance, lengthUnit);
    progressInfo = (
      <ProgressBar
        distanceAlert={alert.distanceAlert}
        startDistance={alert.startDistance}
        currentDistance={componentDistance}
        endDistance={alert.endDistance}
        remainDistance={formatDistance(alert.remainDistance, lengthUnit)}
      />
    );
    if (alert.repeat) {
      repeatInfo = formatDistance(alert.repeatedPeriod, lengthUnit);
    }
  }
  if (alert.requireAction) {
    confirmAction = (
      <div className={classes.confirmationWrapper}>
        <strong>Require action</strong>
        <Button color="primary" onClick={serviceClickHandler}>
          <BuildIcon />
          <span>Service</span>
        </Button>
      </div>
    );
    progressInfo = null;
  }

  return (
    <Card className={classes.root} variant="outlined">
      <div>
        <Grid container>
          <Grid item xs={10} classes={{ item: classes.gridItem }}>
            <Typography variant="subtitle2" component="h3">
              {alert.name}
            </Typography>

          </Grid>
          <Grid item xs={2} classes={{ item: classes.gridItem }}>
            <div className={classes.activitieControls}>
              <Tooltip title="Delete">
                <IconButton type="button" onClick={deleteHandler} classes={{ root: classes.deleteIcon }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.alertInfos}>
              <span className={classes.topInfo}>{`Set on: ${setOn}`}</span>
              {alert.repeat ? (
                <span className={classes.topInfo}>
                  <ReplayIcon fontSize="small" classes={{ root: classes.repeatIcon }} />
                  {`Repeat every: ${repeatInfo}`}
                </span>
              ) : null}
            </div>
            <div className={classes.content}>
              <Typography variant="body2" color="textSecondary">
                {alert.description}
              </Typography>
            </div>
          </Grid>

        </Grid>
      </div>
      <div className={classes.progressInfo}>
        {progressInfo}
        {confirmAction}
      </div>

    </Card>
  );
};
AlertItem.propTypes = {
  alert: PropTypes.shape({
    id: PropTypes.string.isRequired,
    dateAlert: PropTypes.bool.isRequired,
    distanceAlert: PropTypes.bool.isRequired,
    requireAction: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    remainDistance: PropTypes.number,
    endDistance: PropTypes.number,
    startDistance: PropTypes.number,
    remainDays: PropTypes.number,
    endDate: PropTypes.string,
    repeat: PropTypes.bool,
    repeatedPeriod: PropTypes.number,
  }).isRequired,
  lengthUnit: PropTypes.string.isRequired,
  componentDistance: PropTypes.number.isRequired,
  componentId: PropTypes.string.isRequired,
};
export default AlertItem;
