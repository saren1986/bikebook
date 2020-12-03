/* eslint-disable new-cap */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import stravaApi from 'strava-v3';
import { addFromStrava } from '../reducers/activities';
import { addBike } from '../reducers/bikes';
import { convertStravaActivities, convertStravaBike } from '../../utils/dataConventers';
import {
  stravaSyncStart,
  stravaSyncEnd,
  stravaUpdateAthlete,
  stravaUpdateAuth,
  stravaSyncFailed,
} from '../reducers/strava';

export const updateStravaAuthData = (response, dispatch) => {
  const {
    // eslint-disable-next-line camelcase
    access_token, expires_at, expires_in, refresh_token, token_type,
  } = response.data;
  const auth = {
    accessToken: access_token,
    // eslint-disable-next-line camelcase
    expiresAt: expires_at * 1000,
    expiresIn: expires_in,
    refreshToken: refresh_token,
    tokenType: token_type,
  };
  localStorage.setItem('s-auth', JSON.stringify(auth));
  dispatch(stravaUpdateAuth(auth));
  return auth;
};

export const checkStravaAuth = () => (dispatch) => {
  const storageAuth = localStorage.getItem('s-auth');
  if (storageAuth) {
    const sAuth = JSON.parse(storageAuth);
    const { expiresAt, refreshToken } = sAuth;
    if (new Date().getTime() > expiresAt) {
      const queryData = {
        client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
        client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      };
      axios.post('https://www.strava.com/oauth/token', queryData)
        .then((response) => {
          updateStravaAuthData(response, dispatch);
        })
        .catch((error) => {
          dispatch(stravaSyncFailed(error.response.data.message));
        });
    } else {
      dispatch(stravaUpdateAuth(sAuth));
    }
  }
};

const fetchAthlete = async (strava) => strava.athlete.get({});
const fetchBike = async (strava, id) => strava.gear.get({ id });
const fetchActivities = async (strava) => strava.athlete.listActivities({
  after: 1336756835,
  // per_page: 300,
  // page: 10,

  // TODO:  Get Athlete Stats (getStats)
});

export const stravaGetActivities = (token, bikesId) => (dispatch) => {
  const strava = new stravaApi.client(token);
  fetchActivities(strava).then((response) => {
    dispatch(addFromStrava(convertStravaActivities(response, bikesId)));
    dispatch(stravaSyncEnd());
  })
    .catch((err) => {
      dispatch(stravaSyncFailed(err.error.message));
      dispatch(stravaSyncEnd());
    });
};

export const stravaGetBike = (stravaBikesId, token, history) => async (dispatch) => {
  const strava = new stravaApi.client(token);
  const results = [];
  for (const id of stravaBikesId) {
    results.push(fetchBike(strava, id));
  }
  const responses = await Promise.all(results)
    .catch((err) => {
      dispatch(stravaSyncFailed(err.error.message));
    });
  if (responses) {
    for (const response of responses) {
      dispatch(addBike(convertStravaBike(response)));
    }
    dispatch(stravaGetActivities(token, stravaBikesId));
    history.push('/bike-list');
  }
  dispatch(stravaSyncEnd());
};

export const stravaGetAthlete = (token) => async (dispatch) => {
  dispatch(stravaSyncStart());
  const strava = new stravaApi.client(token);
  fetchAthlete(strava)
    .then((response) => {
      dispatch(stravaUpdateAthlete(response));
      dispatch(stravaSyncEnd());
    }).catch((err) => {
      dispatch(stravaSyncFailed(err.error.message));
      dispatch(stravaSyncEnd());
    });
};

export const stravaSync = (code) => async (dispatch) => {
  dispatch(stravaSyncStart());
  const queryData = {
    client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
    client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
  };
  const authResponse = await axios.post('https://www.strava.com/oauth/token', queryData)
    .catch((error) => {
      dispatch(stravaSyncFailed(`Something went wrong... ${error.response.data.message}`));
    });
  if (authResponse) {
    try {
      const auth = updateStravaAuthData(authResponse, dispatch);
      const strava = new stravaApi.client(auth.accessToken);
      const athlete = await fetchAthlete(strava);
      dispatch(stravaUpdateAthlete(athlete));
      const activities = await fetchActivities(strava);
      dispatch(addFromStrava(convertStravaActivities(activities)));
    } catch (error) {
      dispatch(stravaSyncFailed(`Something went wrong... ${error.response.body.message}`));
    }
  }
  dispatch(stravaSyncEnd());
};

export const stravaCheckForUpdate = (token) => async (dispatch) => {
  dispatch(stravaSyncStart());
  const strava = new stravaApi.client(token);
  try {
    const athlete = await fetchAthlete(strava);
    dispatch(stravaUpdateAthlete(athlete));
  } catch (error) {
    dispatch(stravaSyncFailed(`Something went wrong... ${error.response.body.message}`));
  }
  dispatch(stravaSyncEnd());
};
