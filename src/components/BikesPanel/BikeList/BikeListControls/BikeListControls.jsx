import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { BtnWrapper, Btn } from '../../../../styled/styled';


const BikeListControls = ({ history }) => {
  const addNewBikeClickHandler = () => {
    history.push('/bike/add');
  };
  const stravaClickHandler = () => {
    window.location = 'http://www.strava.com/oauth/authorize?client_id=39940&response_type=code&redirect_uri=http://localhost:3000/strava&approval_prompt=force&scope=read,read_all,profile:read_all';
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
