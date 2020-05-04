import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stravaSync, stravaSyncStart, openConfirmDialog } from '../../../store/actions/index';
import Spiner from '../../../UX/Spinner/Spinner';
import { Header } from '../../../styled/styled';
import { STRAVA_SYNC_URL } from '../../../CONST';

const Strava = () => {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const scope = urlParams.get('scope');
  const { startSync, error } = useSelector(((state) => state.strava));
  const [reqScopes, setReqScopes] = useState(null);
  useEffect(() => {
    if (scope) {
      const scopeArr = scope.split(',');
      if (scopeArr.indexOf('read') !== -1
        && scopeArr.indexOf('read_all') !== -1
        && scopeArr.indexOf('profile:read_all') !== -1) {
        dispatch(stravaSyncStart());
        dispatch(stravaSync(code, scope));
      } else {
        setReqScopes(<div>You have to give access to all require scopes</div>);
        dispatch(openConfirmDialog(
          'Insufficient permissions', 'You must grant all permissions. Try again?', () => {
            window.location = STRAVA_SYNC_URL;
          },
        ));
      }
    }
    
  }, []);

  return (
    <div>
      <Header>Synchronize with Strava</Header>
      {startSync ? (
        <div>
          Fetching data from Strava... Please wait.
          <Spiner />
        </div>
      ) : null}
      {error ? (
        <div>
          Error:
          {error}
        </div>
      ) : null}
      {reqScopes}
    </div>
  );
};

export default Strava;
