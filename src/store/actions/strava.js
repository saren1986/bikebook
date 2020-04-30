
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


export const stravaGetBike = (token, stravaBikeId) => (dispatch) => {
  const strava = new stravaApi.client(token);
  strava.gear.get({
    id: stravaBikeId,
  },
  (err, payload, limits) => {
    if (payload) {
      const bike = {
        stravaID: payload.id,
        name: payload.name,
        distance: payload.distance,
        brand: payload.brand_name,
        model: payload.model_name,
        type: `${payload.frame_type}`,
        description: payload.description,
        retired: false,
        frameWeight: null,
      };
      dispatch(addBike(bike, 'km'));
    } else if (err) {
      dispatch(stravaSyncFailed(err.error.message));
    }
  });
};

export const stravaGetAthlete = (token) => (dispatch) => {
  const strava = new stravaApi.client(token);
  strava.athlete.get({},
    (err, payload, limits) => {
      if (payload) {
        dispatch(stravaUpdateAthlete(payload));
        // dispatch(stravaGetBike(token, payload.bikes[0].id));
      } else if (err) {
        dispatch(stravaSyncFailed(err.error.message));
      }
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
      localStorage.setItem('b-auth', JSON.stringify(auth));
      dispatch(stravaGetAthlete(auth.accessToken));
      dispatch(stravaUpdateAuth(auth));
      dispatch(stravaSyncEnd());
    })
    .catch((error) => {
      console.log(error);
      dispatch(stravaSyncFailed(error.response.data.message));
    });
};
