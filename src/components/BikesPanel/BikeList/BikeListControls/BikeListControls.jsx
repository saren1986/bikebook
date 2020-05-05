import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BtnWrapper, Btn } from '../../../../styled/styled';
import { STRAVA_SYNC_URL } from '../../../../CONST';


const BikeListControls = ({ history }) => {
  const isStravaSync = useSelector((state) => state.strava.sync);
  const addNewBikeClickHandler = () => {
    history.push('/bike/add');
  };
  const stravaClickHandler = () => {
    if (isStravaSync) {
      history.push('/strava');
    } else {
      window.location = STRAVA_SYNC_URL;
    }
  };
  return (
    <BtnWrapper>
      <Btn variant="outlined" color="primary" onClick={stravaClickHandler}>
        Import from Strava
      </Btn>
      <Btn variant="outlined" color="primary" onClick={addNewBikeClickHandler}>
        Add new bike
      </Btn>
    </BtnWrapper>
  );
};

export default withRouter(BikeListControls);
