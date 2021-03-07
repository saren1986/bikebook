import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import {
  stravaSync, openConfirmDialog,
} from '../../../store/actions/index';
import Spiner from '../../../UX/Spinner/Spinner';
import InfoBox from '../../../UX/InfoBox/InfoBox';
import { STRAVA_SYNC_URL } from '../../../CONST';

const StravaSync = ({ history }) => {

  const { startSync } = useSelector(((state) => state.strava));
  const dispatch = useDispatch();

  const stravaSyncHandler = () => {
    window.location = STRAVA_SYNC_URL;
  };

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const scope = urlParams.get('scope');

  useEffect(() => {
    if (code && scope) {
      const scopeArr = scope.split(',');
      if (scopeArr.indexOf('read') !== -1
        && scopeArr.indexOf('read_all') !== -1
        && scopeArr.indexOf('profile:read_all') !== -1
        && scopeArr.indexOf('activity:read_all') !== -1) {
        dispatch(stravaSync({
          code,
          clb: () => {
            history.push('/strava');
          },
        }));
      } else {
        dispatch(openConfirmDialog({
          title: 'Insufficient permissions',
          description: 'You must grant all permissions. Try again?',
          confirm: stravaSyncHandler,
        }));
      }
    }
  }, []);

  return code ? (
    <div>
      {startSync ? (
        <>
          <InfoBox
            type="normal"
            title="Fetching data from Strava... Please wait."
          />
          <Spiner />
        </>
      ) : null }
    </div>
  ) : <Redirect to="/strava" />;
};

export default withRouter(StravaSync);
