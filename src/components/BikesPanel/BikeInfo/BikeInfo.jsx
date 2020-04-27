import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import useStyles from './bikeInfo.style';

const BikeInfo = ({ bike }) => {
  const classes = useStyles();
  return (
    <Typography
      variant="h2"
      component="h2"
      classes={{
        root: classes.header,
      }}
    >
      {bike.name}
    </Typography>
  );
};

BikeInfo.propTypes = {
  bike: PropTypes.object.isRequired,
};
export default BikeInfo;
