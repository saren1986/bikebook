import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  stravaSync, stravaSyncStart, openConfirmDialog, stravaGetAthlete,
} from '../../../store/actions/index';
import Spiner from '../../../UX/Spinner/Spinner';
import InfoBox from '../../../UX/InfoBox/InfoBox';
import { Header, BtnWrapper, Btn } from '../../../styled/styled';
import BikeSync from './BikesSync/BikesSync';
import { STRAVA_SYNC_URL } from '../../../CONST';

const Strava = () => {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const scope = urlParams.get('scope');
  const token = useSelector((state) => state.strava.auth.accessToken);
  const { startSync, error } = useSelector(((state) => state.strava));
  const isStravaSync = useSelector(((state) => state.strava.sync));
  const { bikes } = useSelector(((state) => state.strava));
  const [updateBox, setUpdateBox] = useState(true);
  const stravaSyncHandler = () => {
    window.location = STRAVA_SYNC_URL;
  };
  useEffect(() => {
    if (!isStravaSync && scope) {
      const scopeArr = scope.split(',');
      if (scopeArr.indexOf('read') !== -1
        && scopeArr.indexOf('read_all') !== -1
        && scopeArr.indexOf('profile:read_all') !== -1) {
        dispatch(stravaSyncStart());
        dispatch(stravaSync(code, scope));
        setUpdateBox(false);
      } else {
        dispatch(openConfirmDialog(
          'Insufficient permissions', 'You must grant all permissions. Try again?', stravaSyncHandler
        ));
      }
    }
  }, [isStravaSync]);
  const updateClickHandler = () => {
    setUpdateBox(false);
    dispatch(stravaSyncStart());
    dispatch(stravaGetAthlete(token, true));
  };
  let bikesSelect = null;
  if (bikes && !error && !startSync) {
    bikesSelect = <BikeSync bikes={bikes} />;
  }
  let content = null;
  if (isStravaSync && !startSync && updateBox) {
    content = (
      <div>
        <InfoBox type="info">
          Your account is already synchronized with Strava
        </InfoBox>
        <BtnWrapper>
          <Btn variant="outlined" color="primary" onClick={updateClickHandler}>
            Check for update
          </Btn>
        </BtnWrapper>
      </div>
    );
  } else if (startSync) {
    content = (
      <div>
        <InfoBox type="normal">
          Fetching data from Strava... Please wait.
        </InfoBox>
        <Spiner />
      </div>
    );
  } else if (bikes && !error && !startSync) {
    content = (
      <div>
        {bikesSelect}
      </div>
    );
  } else {
    content = (
      <>
        <InfoBox type="warning">
          Strava synchronization is not enabled
        </InfoBox>
        <BtnWrapper>
          <Btn variant="outlined" color="primary" onClick={stravaSyncHandler}>
            Sync with Strava
          </Btn>
        </BtnWrapper>
      </>
    );
  }
  return (
    <div>
      <Header>Synchronize with Strava</Header>
      {content}
    </div>
  );
};

export default Strava;
