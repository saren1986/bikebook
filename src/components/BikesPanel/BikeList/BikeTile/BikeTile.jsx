import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { formatDistance } from '../../../../utils/distanceFormatters';
import StravaLong from '../../../../icons/Strava/StravaLong';

const useStyles = makeStyles((theme) => ({

  topInfo: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 30,
    marginTop: -10,
    marginBottom: 10,
  },
  pos: {
    marginBottom: 12,
  },
  retiredWrapper: {
    background: '#e6e3e3c4',
  },
  retired: {
    color: '#f00',
  },
  topLeft: {
    width: '50%',
  },
  topRight: {
    width: '50%',
    textAlign: 'right',
  },
}));

const BikeTile = ({ bike, click }) => {
  const classes = useStyles();
  const { lengthUnit } = useSelector((state) => state.options.units);
  return (
    <Grid item md={4} xs={12}>
      <Card
        className={bike.retired ? classes.retiredWrapper : classes.root}
        variant="outlined"
      >
        <CardActionArea onClick={click}>
          <CardContent>
            <div className={classes.topInfo}>
              <div className={classes.topLeft}>
                {!bike.retired ? null
                  : (<strong className={classes.retired}>RETIRED</strong>)}
              </div>
              <div className={classes.topRight}>{bike.stravaId ? <StravaLong /> : 'Bikebook'}</div>

            </div>
            <Typography variant="h5" component="h2">
              {bike.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {formatDistance(bike.distance, lengthUnit)}
            </Typography>
            <Typography variant="body2" component="p">
              {/* actions & stats */}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
BikeTile.propTypes = {
  bike: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    stravaId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
    ]),
    retired: PropTypes.bool.isRequired,
  }).isRequired,
  click: PropTypes.func.isRequired,
};

export default BikeTile;
