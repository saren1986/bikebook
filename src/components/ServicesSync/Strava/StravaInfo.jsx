import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SyncIcon from '@material-ui/icons/Sync';

import InfoBox from '../../../UX/InfoBox/InfoBox';
import { BtnWrapper, Btn } from '../../../styled/styled';
import BikeSync from './BikesSync/BikesSync';
import InfoHeader from '../../../UX/InfoHeader/InfoHeader';
import { STRAVA_SYNC_URL } from '../../../CONST';

const StravaInfo = () => {
  const token = useSelector((state) => state.strava.auth.accessToken);
  const stravaId = useSelector((state) => state.strava.stravaId);
  const userId = useSelector((state) => state.user.id);

  const stravaSyncHandler = () => {
    window.location = STRAVA_SYNC_URL;
  };

  const updateClickHandler = () => {
    // dispatch(stravaCheckForUpdate(token, activities)); // TODO: checking Strava update
    window.location = STRAVA_SYNC_URL;
  };

  const menuItems = [];

  if (stravaId) {
    menuItems.push({
      name: 'Check for update',
      func: updateClickHandler,
    });
  } else {
    menuItems.push({
      name: 'Sync with Strava',
      func: stravaSyncHandler,
    });
  }
  return userId ? (
    <div>
      <InfoHeader
        title="Strava"
        menuItems={menuItems}
        rightPlaceholder={stravaId && token ? (
          <>
            <div>
              Sync
              <SyncIcon />
            </div>
          </>
        ) : null}
      />
      {stravaId && token ? (
        <div><BikeSync /></div>
      ) : (
        <>
          <InfoBox
            type="warning"
            title="Strava synchronization is not enabled"
          />
          <BtnWrapper>
            <Btn variant="outlined" color="primary" onClick={stravaSyncHandler}>
              Sync with Strava
            </Btn>
          </BtnWrapper>
        </>
      )}
    </div>
  ) : <Redirect to="/" />;
};

export default StravaInfo;
