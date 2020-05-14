import React from 'react';
import Card from '@material-ui/core/Card';
import Edit from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import StravaLong from '../../../../icons/Strava/StravaLong';

const useStyles = makeStyles({
  root: {
    padding: '15px',
    minWidth: 275,
    '&:not(:last-of-type)': {
      borderBottom: 'none',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderRadius: 0,
    },
  },
  top: {},
  topWithMargin: {
    marginTop: '-20px',
    marginBottom: '-20px',
  },
  title: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  activitieControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
const ActivityTile = ({
  startDate, strava, title, bike, distance, time,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <div className={!strava ? classes.topWithMargin : classes.top}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {startDate}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.activitieControls}>
              {!strava ? (
                <>
                  <Tooltip title="Delete">
                    <IconButton type="button">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton type="button">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                </>
              )
                : (
                  <div>
                    <StravaLong />
                  </div>
                )}
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.content}>
        {' '}
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography color="textSecondary">
          {bike}
          {' '}
          •
          {' '}
          {distance}
          {' '}
          •
          {' '}
          {time}
        </Typography>
      </div>
    </Card>
  );
};
ActivityTile.propTypes = {
  startDate: PropTypes.string.isRequired,
  strava: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  bike: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
export default ActivityTile;
