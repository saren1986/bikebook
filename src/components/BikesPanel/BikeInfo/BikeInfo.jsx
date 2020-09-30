import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const BikeInfo = ({ bike, history }) => {
  console.log('Bike', bike);
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
        <div className={classes.actionsBar}>
          <button onClick={onEditClickHandler}>edit</button>
        </div>
      
    </>
  );
};

BikeInfo.propTypes = {
  bike: PropTypes.object.isRequired,
};
export default withRouter(BikeInfo);
