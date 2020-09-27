import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import useStyles from './bikeInfo.style';

const BikeInfo = ({ bike, history }) => {
  const classes = useStyles();

  const onEditClickHandler = () => {
    history.push({
      pathname: '/bike/edit',
      bike,
    });
  };
  return (
    <>
      <Typography
        variant="h2"
        component="h2"
        classes={{
          root: classes.header,
        }}
      >
        {bike.name}
      </Typography>
      <button onClick={onEditClickHandler}>edit</button>
    </>
  );
};

BikeInfo.propTypes = {
  bike: PropTypes.object.isRequired,
};
export default withRouter(BikeInfo);
