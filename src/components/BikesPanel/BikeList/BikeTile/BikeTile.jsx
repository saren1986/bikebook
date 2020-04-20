import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import useStyles from './bikeTile.style';
import { formatDistance } from '../../../../utils/distanceFormatters';


const BikeTile = ({ bike, click }) => {
  const classes = useStyles();
  const { lengthUnit } = useSelector((state) => state.user.units);
  return (
    <Grid item md={4}>
      <button type="button" className={classes.wrapper} onClick={click}>
        <div className={classes.top}>
          <span className={classes.name}>{bike.name}</span>
          <span>{formatDistance(bike.distance, lengthUnit)}</span>
        </div>
      </button>
    </Grid>
  );
};
BikeTile.propTypes = {
  bike: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
  }).isRequired,
  click: PropTypes.func.isRequired,
};

export default BikeTile;
