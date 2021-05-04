/* eslint-disable new-cap */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import { addBikes } from '../reducers/bikes';
import {
  stravaSyncStart,
  stravaSyncEnd,
  stravaUpdateAthlete,
  stravaUpdateAuth,
  stravaSyncFailed,
  stravaUpdateBikes,
} from '../reducers/strava';
import cognito from '../../services/cognito';

export const fetchBikes = ({ bikes, clb }) => async (dispatch) => {
  dispatch(stravaSyncStart());

  const session = await cognito.getSession();
  const token = session.accessToken;
  axios.defaults.headers.post.Authorization = token;
  // TODO: AUTH: move this to the global / external

  const response = await axios
    .post(`${process.env.REACT_APP_ENDPOINT_URL}/strava/fetchBikes`, { bikes })
    .catch((error) => {
      dispatch(stravaSyncFailed({ error: `Something went wrong... ${error.response.data.message || ''}` }));
    });
  if (response) {
    dispatch(addBikes(response.data.bikes));
    dispatch(stravaUpdateBikes(response.data.bikes));
  }
  dispatch(stravaSyncEnd());
  if (clb) {
    clb();
  }
};

export const stravaSync = ({ code, clb }) => async (dispatch) => {
  dispatch(stravaSyncStart());

  const session = await cognito.getSession();
  const token = session.accessToken;
  axios.defaults.headers.post.Authorization = token;
  // TODO: AUTH: move this to the global / external

  const response = await axios
    .post(`${process.env.REACT_APP_ENDPOINT_URL}/strava/sync`, { code })
    .catch((error) => {
      dispatch(stravaSyncFailed(`Something went wrong... ${error.response.data.message || ''}`));
    });
  // console.log('stravaSync response', response);
  const { errors } = response.data;
  if (errors.length) {
    const errorFailed = errors.find((err) => err.status === 'failed');
    if (errorFailed) {
      dispatch(stravaSyncFailed({ error: errorFailed.message }));
      clb();
      dispatch(stravaSyncEnd());
      return false;
    }
  }

  dispatch(stravaUpdateAuth(response.data.stravaAuth));
  dispatch(stravaUpdateAthlete(response.data.stravaAthlete));
  dispatch(stravaUpdateBikes(response.data.bikesDraft));
  clb();
  dispatch(stravaSyncEnd());
};

export const stravaCheckForUpdate = () => async (dispatch) => {
  dispatch(stravaSyncStart());
  const session = await cognito.getSession();
  const token = session.accessToken;
  axios.defaults.headers.post.Authorization = token;
  // TODO: AUTH: move this to the global / external
  const response = await axios
    .post(`${process.env.REACT_APP_ENDPOINT_URL}/strava/sync-update`)
    .catch((error) => {
      dispatch(stravaSyncFailed(`Something went wrong... ${error.response.data.message || ''}`));
    });
  const { errors } = response.data;
  if (errors.length) {
    const errorFailed = errors.find((err) => err.status === 'failed');
    if (errorFailed) {
      dispatch(stravaSyncFailed({ error: errorFailed.message }));
      dispatch(stravaSyncEnd());
      return false;
    }
  }
  dispatch(stravaUpdateBikes(response.data.bikesDraft));
  console.log('stravaCheckForUpdate', response);
};
