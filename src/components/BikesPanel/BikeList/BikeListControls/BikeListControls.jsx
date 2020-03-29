import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { BtnWrapper } from '../../../../styled/styled';


const BikeListControls = ({ history }) => {
  const addNewBikeClickHandler = () => {
    history.push('/bike/add');
  };
  return (
    <BtnWrapper>
      <Button variant="outlined" color="primary" onClick={addNewBikeClickHandler}>
        Add new bike
      </Button>
      {/* <Button variant="outlined" color="primary">
        Import from Strava
      </Button> */}
    </BtnWrapper>
  );
};

export default withRouter(BikeListControls);
