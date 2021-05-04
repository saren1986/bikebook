import axios from 'axios';
import {
  setAccessToken,
  clearAccessToken,
  setError,
  setInitUser,
  setInfo,
} from '../reducers/auth';
import cognito from '../../services/cognito';
import { resetAppStore } from '../reducers/root';

// TODO: updating session
export const getLocalStorageToken = () => cognito.getCognitoAccessToken();

export const register = ({ userDetails, onSuccess, onFailure }) => (dispatch) => {
  dispatch(setError({ message: null }));
  axios
    .post(`${process.env.REACT_APP_ENDPOINT_URL}/user/register`, userDetails)
    .then((result) => {
      const { cognitoUserSub, email, username } = result.data;
      dispatch(setInitUser({ cognitoUserSub, email, username }));
      dispatch(setInfo({ message: 'Veryfication code was sent on your email address.' })); // TODO: export to literals
      onSuccess();
    })
    .catch((err) => {
      console.log('err...', err);
      let errorMessage = null;
      if (err.response) {
        const { data } = err.response;
        errorMessage = data.message || err;
      } else {
        errorMessage = err.message || err;
      }
      dispatch(setError({ message: errorMessage }));
      onFailure();
    });
};

export const confirmRegister = (userDetails, clb) => (dispatch) => {
  dispatch(setError({ message: null }));
  axios
    .post(`${process.env.REACT_APP_ENDPOINT_URL}/user/confirm`, userDetails)
    .then((result) => {
      dispatch(setInfo({ message: result.data.message }));
    })
    .catch((err) => {
      const errorMessage = err.response.data.message || err;
      dispatch(setError({ message: errorMessage }));
    })
    .finally(() => {
      clb();
    });
};

export const resendConfirmationCode = (username = '') => (dispatch) => {
  dispatch(setError({ message: null }));
  cognito
    .resendConfirmationCode(username)
    .then((result) => {
      const { Destination } = result.CodeDeliveryDetails;
      dispatch(setInfo({ message: `Veryfication code was sent on address ${Destination}` })); // TODO: export to literals
    })
    .catch((err) => {
      dispatch(setError({ message: err.message || JSON.stringify(err) }));
    });
};

export const initAuth = (isAuth) => (dispatch) => {
  cognito
    .getSession()
    .then((sessionDetails) => {
      if (sessionDetails && sessionDetails.accessToken !== isAuth) {
        // updateLocalStorageAuth(sessionDetails);
        dispatch(setAccessToken(sessionDetails));
      }
    })
    .catch((err) => {
      dispatch(setError({ message: err.message }));
    });
  return null;
};

export const signIn = ({ userDetails, onSuccess, onFailure }) => (dispatch) => {
  dispatch(setError({ message: null }));
  cognito
    .signIn(userDetails)
    .then((sessionDetails) => {
      dispatch(setAccessToken(sessionDetails));
      onSuccess();
    })
    .catch((err) => {
      dispatch(setError({ message: err.message }));
      onFailure();
    });
};

export const signOut = () => async (dispatch) => {
  cognito
    .signOut()
    .then(() => {
      // clearLocalStorage();
      dispatch(clearAccessToken());
      dispatch(resetAppStore());
    })
    .catch((err) => {
      console.log('err', err); // TODO: signout logout error handler
    });
};

///
// const updateLocalStorageAuth = (payload) => {
//   const {
//     accessToken, exp, userId, username,
//   } = payload;
//   localStorage.setItem(
//     'auth',
//     JSON.stringify({
//       accessToken,
//       exp,
//       userId,
//       username,
//     }),
//   );
// };
// const clearLocalStorage = () => {
//   localStorage.removeItem('auth');
// };
