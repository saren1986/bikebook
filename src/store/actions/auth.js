import { setAccessToken, clearAccessToken, setError } from '../reducers/auth';
import cognito from '../../services/cognito';
import { resetAppStore } from '../reducers/root';

export const getLocalStorageToken = () => cognito.getCognitoAccessToken();

const clearLocalStorage = () => {
  localStorage.removeItem('auth');
};

// const getExpDate = () => {
//   const ls = localStorage.getItem('auth');
//   if (!ls) return null;
//   const auth = JSON.parse(ls);
//   if (auth.exp) return auth.exp;
//   return null;
// };

const updateLocalStorageAuth = (payload) => {
  const {
    accessToken, exp, userId, username,
  } = payload;
  localStorage.setItem('auth', JSON.stringify({
    accessToken, exp, userId, username,
  }));
};

export const initAuth = (isAuth) => (dispatch) => {
  cognito
    .getSession()
    .then((sessionDetails) => {
      if (sessionDetails && sessionDetails.accessToken !== isAuth) {
        updateLocalStorageAuth(sessionDetails);
        dispatch(setAccessToken(sessionDetails));
      }
    })
    .catch((err) => {
      dispatch(setError(err.message));
    });
  return null;
};

export const signIn = (userDetails, clb) => (dispatch) => {
  cognito
    .signIn(userDetails)
    .then((sessionDetails) => {
      updateLocalStorageAuth(sessionDetails);
      dispatch(setAccessToken(sessionDetails));
    })
    .catch((err) => {
      dispatch(setError({ message: err.message }));
      clb();
    });
};

export const signOut = () => async (dispatch) => {
  cognito
    .signOut()
    .then(() => {
      clearLocalStorage();
      dispatch(clearAccessToken());
      dispatch(resetAppStore());
    })
    .catch((err) => {
      console.log('err', err); // TODO: signout logout error handler
    });
};
