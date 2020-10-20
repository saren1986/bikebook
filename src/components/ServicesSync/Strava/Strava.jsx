import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  stravaSync, stravaCheckForUpdate, stravaSyncStart, openConfirmDialog, stravaGetAthlete, checkStravaAuth,
} from '../../../store/actions/index';
import Spiner from '../../../UX/Spinner/Spinner';
import InfoBox from '../../../UX/InfoBox/InfoBox';
import { Header, BtnWrapper, Btn } from '../../../styled/styled';
import BikeSync from './BikesSync/BikesSync';
import { STRAVA_SYNC_URL } from '../../../CONST';

const Strava = () => {
  const token = useSelector((state) => state.strava.auth.accessToken);
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const scope = urlParams.get('scope');
  const { startSync, error } = useSelector(((state) => state.strava));
  const athlete = useSelector(((state) => !!state.strava.athlete.id));
  const activities = useSelector(((state) => state.activities));
  const { bikes } = useSelector(((state) => state.strava));

  const [updateBox, setUpdateBox] = useState(true);
  const stravaSyncHandler = () => {
    window.location = STRAVA_SYNC_URL;
  };
  useEffect(() => {
    if (!token && scope) {
      const scopeArr = scope.split(',');
      if (scopeArr.indexOf('read') !== -1
        && scopeArr.indexOf('read_all') !== -1
        && scopeArr.indexOf('profile:read_all') !== -1
        && scopeArr.indexOf('activity:read_all') !== -1) {
        dispatch(stravaSync(code, scope));
        setUpdateBox(false);
      } else {
        dispatch(openConfirmDialog({
          title: 'Insufficient permissions',
          description: 'You must grant all permissions. Try again?',
          confirm: stravaSyncHandler,
        }));
      }
    } else if (!athlete && token) {
      dispatch(stravaCheckForUpdate(token));
    }
  }, [token, scope]);

  const updateClickHandler = () => {
    setUpdateBox(false);
    dispatch(stravaCheckForUpdate(token, activities));
  };
  let bikesSelect = null;
  if (bikes && !error && !startSync) {
    bikesSelect = <BikeSync bikes={bikes} />;
  }
  let content = null;
  if (athlete && !startSync && updateBox) {
    content = (
      <div>
        <InfoBox
          type="info"
          title="Your account is already synchronized with Strava"
        />
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
        <InfoBox
          type="normal"
          title="Fetching data from Strava... Please wait."
        />
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
        {error ? (
          <InfoBox
            type="error"
            title={error}
          />
        ) : (
          <InfoBox
            type="warning"
            title="Strava synchronization is not enabled"
          />
        )}

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
