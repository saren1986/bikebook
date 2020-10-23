import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import BikeTile from './BikeTile/BikeTile';
import Spinner from '../../../UX/Spinner/Spinner';
import InfoBox from '../../../UX/InfoBox/InfoBox';
import { setActiveBike } from '../../../store/actions/index';
import InfoHeader from '../../../UX/InfoHeader/InfoHeader';
import { BtnWrapper, Btn } from '../../../styled/styled';
import { STRAVA_SYNC_URL } from '../../../CONST';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 10,
  },
}));

const BikeList = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const bikeList = useSelector((state) => state.bikes);
  const isStravaAuth = useSelector((state) => !!state.strava.auth.accessToken);

  const bikeClickHandler = (bikeId) => () => {
    dispatch(setActiveBike(bikeId));
    history.push('/bike');
  };

  const addNewClickHandler = () => {
    history.push('/bike/add');
  };
  const stravaClickHandler = () => {
    if (isStravaAuth) {
      history.push('/strava');
    } else {
      window.location = STRAVA_SYNC_URL;
    }
  };

  const renderedBikeList = bikeList
    ? bikeList.slice()
      .sort((a, b) => {
        if (a.retired === b.retired) return 0;
        if (b.retired) return -1;
        return 1;
      })
      .map((bike) => (
        <BikeTile
          key={bike.id}
          bike={bike}
          click={bikeClickHandler(bike.id)}
        />
      ))
    : <Spinner />;
  const menuItems = [
    {
      name: 'Add new',
      func: addNewClickHandler,
    },
    {
      name: 'Import from Strava',
      func: stravaClickHandler,
    },
  ];
  return (
    <>
      <InfoHeader
        title="Your Bikes"
        menuItems={menuItems}
      />
      <div className={classes.root}>
        {renderedBikeList.length
          ? (<Grid container spacing={2}>{renderedBikeList}</Grid>)
          : (
            <>
              <InfoBox
                type="warning"
                title="You have not any bikes yet."
              />
              <BtnWrapper>
                <Btn variant="outlined" color="primary" onClick={stravaClickHandler}>
                  Import from Strava
                </Btn>
                <Btn variant="outlined" color="primary" onClick={addNewClickHandler}>
                  Add new bike
                </Btn>
              </BtnWrapper>
            </>
          )}
      </div>
    </>
  );
};

BikeList.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(BikeList);
