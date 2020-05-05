/* eslint-disable no-restricted-syntax */

import axios from 'axios';
import stravaApi from 'strava-v3';
import * as actionTypes from './actionTypes';
import { addBike } from './bikes';


export const stravaSyncStart = () => ({
  type: actionTypes.STRAVA_SYNC_START,
});
export const stravaSyncEnd = () => ({
  type: actionTypes.STRAVA_SYNC_END,
});
export const stravaUpdateAthlete = (athlete) => ({
  type: actionTypes.STRAVA_UPDATE_ATHLETE,
  data: {
    athlete,
  },
});
export const stravaUpdateBikes = (bikes) => ({
  type: actionTypes.STRAVA_UPDATE_BIKES,
  data: {
    bikes,
  },
});
export const stravaUpdateAuth = (auth) => ({
  type: actionTypes.STRAVA_UPDATE_AUTH,
  data: {
    auth,
  },
});
const stravaSyncFailed = (error) => ({
  type: actionTypes.STRAVA_SYNC_FAILED,
  data: {
    error,
  },
});

export const stravaGetBike = (stravaBikesId, token, history) => async (dispatch) => {
  const strava = new stravaApi.client(token);
  const results = [];
  for (const id of stravaBikesId) {
    results.push(strava.gear.get({
      id,
    }));
  }
  const responses = await Promise.all(results)
    .catch((err) => {
      dispatch(stravaSyncFailed(err.error.message));
    });
  if (responses) {
    for (const response of responses) {
      const bike = {
        stravaId: response.id,
        name: response.name,
        distance: response.distance,
        brand: response.brand_name,
        model: response.model_name,
        type: `${response.frame_type}`,
        description: response.description,
        retired: false,
        frameWeight: null,
      };
      dispatch(addBike(bike, 'km'));
    }
    history.push('/bike-list');
  }
  dispatch(stravaSyncEnd());
};

export const stravaGetAthlete = (token, onlyBikeList = false) => (dispatch) => {
  const strava = new stravaApi.client(token);
  strava.athlete.get({},
    (err, payload) => {
      if (payload && onlyBikeList) {
        dispatch(stravaUpdateBikes(payload.bikes));
      } else if (payload) {
        dispatch(stravaUpdateAthlete(payload));
      } else if (err) {
        dispatch(stravaSyncFailed(err.error.message));
      }
      dispatch(stravaSyncEnd());
    });
};

export const stravaSync = (code) => (dispatch) => {
  const queryData = {
    client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
    client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
  };
  axios.post('https://www.strava.com/oauth/token', queryData)
    .then((response) => {
      const {
        access_token, expires_at, expires_in, refresh_token, token_type,
      } = response.data;
      const auth = {
        accessToken: access_token,
        expiresAt: expires_at,
        expiresIn: expires_in,
        refreshToken: refresh_token,
        tokenType: token_type,
      };
      localStorage.setItem('s-auth', JSON.stringify(auth));
      dispatch(stravaGetAthlete(auth.accessToken));
      dispatch(stravaUpdateAuth(auth));
      dispatch(stravaSyncEnd());
    })
    .catch((error) => {
      console.log(error);
      dispatch(stravaSyncFailed(error.response.data.message));
    });
};

export const checkStravaAuth = () => (dispatch) => {
  const sAuth = localStorage.getItem('s-auth');
  if (sAuth) {
    dispatch(stravaUpdateAuth(JSON.parse(sAuth)));
  }
};
