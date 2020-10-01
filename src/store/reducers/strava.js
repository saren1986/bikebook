import * as actionTypes from '../actions/actionTypes';

const defaultState = {
  startSync: false,
  sync: false,
  auth: {
    accessToken: null,
    expiresAt: null,
    expiresIn: null,
    refreshToken: null,
    tokenType: 'Bearer',
  },
  athlete: {
    id: null,
    username: null,
    firstname: null,
    lastname: null,
    premium: null,
    profile: null,
    profileMedium: null,
    resourceState: null,
    sex: null,
    updatedAt: null,
    weight: null,
    measurementPreference: null,
  },
  bikes: null,
  error: null,
};

const stravaUpdateAthlete = (state, action) => {
  const {
    id, username, firstname,
    lastname, premium, profile, weight,
    profile_medium, resource_state, sex, updated_at, measurement_preference,
  } = action.data.athlete;
  return {
    ...state,
    sync: true,
    athlete: {
      id,
      username,
      firstname,
      lastname,
      premium,
      profile,
      profileMedium: profile_medium,
      resourceState: resource_state,
      sex,
      updatedAt: updated_at,
      weight,
      measurementPreference: measurement_preference,
    },
    bikes: action.data.athlete.bikes,
  };
};

const stravaUpdateBikes = (state, action) => {
  return {
    ...state,
    bikes: action.data.bikes,
  };
};

const stravaUpdateAuth = (state, action) => {
  const {
    accessToken, expiresAt, expiresIn, refreshToken, tokenType,
  } = action.data.auth;
  return {
    ...state,
    auth: {
      accessToken,
      expiresAt,
      expiresIn,
      refreshToken,
      tokenType,
    },
  };
};

const stravaSyncStart = (state) => ({
  ...state,
  startSync: true,
});

const stravaSyncEnd = (state) => ({
  ...state,
  startSync: false,
});

const stravaSyncFailed = (state, action) => ({
  ...state,
  startSync: false,
  error: action.data.error,
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.STRAVA_UPDATE_ATHLETE: return stravaUpdateAthlete(state, action);
    case actionTypes.STRAVA_UPDATE_BIKES: return stravaUpdateBikes(state, action);
    case actionTypes.STRAVA_UPDATE_AUTH: return stravaUpdateAuth(state, action);
    case actionTypes.STRAVA_SYNC_START: return stravaSyncStart(state);
    case actionTypes.STRAVA_SYNC_END: return stravaSyncEnd(state);
    case actionTypes.STRAVA_SYNC_FAILED: return stravaSyncFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
