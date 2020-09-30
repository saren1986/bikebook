import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { formatDistance } from '../../../../utils/distanceFormatters';
import StravaLong from '../../../../icons/Strava/StravaLong';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: '1px solid #ccc',
    padding: '15px',
    minHeight: '100px',
    display: 'block',
    textDecoration: 'none',
    textAlign: 'center',
    width: '100%',
    cursor: 'pointer',
    '&:active':
      { color: 'inherit' },
  },
  name: {
    fontWeight: 'bold',
  },
  top: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column',
    '&> span': { display: 'block', margin: '10px 0' },
  },
  syncInfo: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: 30,
    marginTop: -10,
    marginBottom: 10,
  },
  pos: {
    marginBottom: 12,
  },
}));

const BikeTile = ({ bike, click }) => {
  const classes = useStyles();
  const { lengthUnit } = useSelector((state) => state.user.units);
  return (
    <Grid item md={4} xs={12}>
      <Card
        className={classes.root}
        variant="outlined"
      >
        <CardActionArea onClick={click}>
          <CardContent>
            <div className={classes.syncInfo}>
              {bike.strava ? <StravaLong /> : 'Bikebook'}
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
    strava: PropTypes.bool.isRequired,
  }).isRequired,
  click: PropTypes.func.isRequired,
};

export default BikeTile;
