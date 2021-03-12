/* eslint-disable new-cap */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import { addFromStrava } from '../reducers/activities';
import { addBikes } from '../reducers/bikes';
import { convertStravaActivities, convertStravaBike } from '../../utils/dataConventers';
import {
  stravaSyncStart,
  stravaSyncEnd,
  stravaUpdateAthlete,
  stravaUpdateAuth,
  stravaSyncFailed,
  stravaUpdateBikes,
} from '../reducers/strava';
import cognito from '../../services/cognito';
import { setUser } from '../reducers/user';

// export const stravaGetActivities = (token, bikesId) => (dispatch) => {
//   const strava = new stravaApi.client(token);
//   fetchActivities(strava).then((response) => {
//     dispatch(addFromStrava(convertStravaActivities(response, bikesId)));
//     dispatch(stravaSyncEnd());
//   })
//     .catch((err) => {
//       dispatch(stravaSyncFailed(err.error.message));
//       dispatch(stravaSyncEnd());
//     });
// };

export const fetchBikes = ({ bikes, clb }) => async (dispatch) => {
  dispatch(stravaSyncStart());

  const session = await cognito.getSession();
  const token = session.accessToken;
  axios.defaults.headers.post.Authorization = token; // TODO: AUTH: move this to the global / external

  const response = await axios
    .post(`${process.env.REACT_APP_ENDPOINT_URL}/strava/fetchBikes`, { bikes })
    .catch((error) => {
      dispatch(stravaSyncFailed(`Something went wrong... ${error.response.data.message || ''}`));
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
  if (response) {
    console.log('stravaSync RES', response);

    dispatch(stravaUpdateAuth(response.data.stravaAuth));
    dispatch(stravaUpdateAthlete(response.data.stravaAthlete));
    dispatch(stravaUpdateBikes(response.data.bikesDraft));

    // const activities = await fetchActivities(strava);
    // dispatch(addFromStrava(convertStravaActivities(activities)));
    clb();
  }
  dispatch(stravaSyncEnd());
};

export const stravaCheckForUpdate = (token) => async (dispatch) => {};
