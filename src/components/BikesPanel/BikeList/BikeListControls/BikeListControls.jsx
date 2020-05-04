import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { BtnWrapper, Btn } from '../../../../styled/styled';
import { STRAVA_SYNC_URL } from '../../../../CONST';


const BikeListControls = ({ history }) => {
  const addNewBikeClickHandler = () => {
    history.push('/bike/add');
  };
  const stravaClickHandler = () => {
    window.location = STRAVA_SYNC_URL;
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
