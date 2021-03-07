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

export const updateStravaAuthData = (response, dispatch) => {
  // const {
  //   stravaAccessToken, stravaExpiresAt, stravaExpiresIn, stravaRefresToken,
  // } = response.data;
  // const auth = {
  //   accessToken: stravaAccessToken,
  //   expiresAt: stravaExpiresAt * 1000,
  //   expiresIn: stravaExpiresIn,
  //   refreshToken: stravaRefresToken,
  // };
  // localStorage.setItem('s-auth', JSON.stringify(auth));
  // dispatch(stravaUpdateAuth(auth));
  // return auth;
};

export const checkStravaAuth = () => (dispatch) => {
  // const storageAuth = localStorage.getItem('s-auth');
  // if (storageAuth) {
  //   const sAuth = JSON.parse(storageAuth);
  //   const { expiresAt, refreshToken } = sAuth;
  //   if (new Date().getTime() > expiresAt) {
  //     const queryData = {
  //       client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
  //       client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
  //       refresh_token: refreshToken,
  //       grant_type: 'refresh_token',
  //     };
  //     axios.post('https://www.strava.com/oauth/token', queryData)
  //       .then((response) => {
  //         updateStravaAuthData(response, dispatch);
  //       })
  //       .catch((error) => {
  //         dispatch(stravaSyncFailed(error.response.data.message));
  //       });
  //   } else {
  //     dispatch(stravaUpdateAuth(sAuth));
  //   }
  // }
};

// const fetchActivities = async (strava) => strava.athlete.listActivities({
//   after: 1336756835,
//   // per_page: 300,
//   // page: 10,

//   // TODO:  Get Athlete Stats (getStats)
// });

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

// export const stravaGetAthlete = (token) => async (dispatch) => {
//   dispatch(stravaSyncStart());
//   const strava = new stravaApi.client(token);
//   fetchAthlete(strava)
//     .then((response) => {
//       dispatch(stravaUpdateAthlete(response));
//       dispatch(stravaSyncEnd());
//     }).catch((err) => {
//       dispatch(stravaSyncFailed(err.error.message));
//       dispatch(stravaSyncEnd());
//     });
// };
export const fetchBikes = ({ bikes, clb }) => async (dispatch) => {
  dispatch(stravaSyncStart());
  const session = await cognito.getSession();
  const token = session.accessToken;
  axios.defaults.headers.post.Authorization = token; // TODO: move this to the global / external
  const response = await axios
    .post(`${process.env.REACT_APP_ENDPOINT_URL}/strava/fetchBikes`, { bikes })
    .catch((error) => {
      dispatch(stravaSyncFailed(`Something went wrong... ${error.response.data.message || ''}`));
    });
  if (response) {
    dispatch(addBikes(response.data.bikes));
    dispatch(stravaUpdateBikes(response.data.bikes));
    // clb();
  }
  dispatch(stravaSyncEnd());
};

export const stravaSync = ({ code, clb }) => async (dispatch) => {
  dispatch(stravaSyncStart());
  const session = await cognito.getSession();
  const token = session.accessToken;
  axios.defaults.headers.post.Authorization = token; // TODO: move this to the global / external
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

export const stravaCheckForUpdate = (token) => async (dispatch) => {
  // dispatch(stravaSyncStart());
  // const strava = new stravaApi.client(token);
  // try {
  //   const athlete = await fetchAthlete(strava);
  //   dispatch(stravaUpdateAthlete(athlete));
  // } catch (error) {
  //   dispatch(stravaSyncFailed(`Something went wrong... ${error.response.body.message || ''}`));
  // }
  // dispatch(stravaSyncEnd());
};
