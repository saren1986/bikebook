/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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

const stravaSlice = createSlice({
  name: 'strava',
  initialState,
  reducers: {
    updateBikes: (state, { payload }) => {
      state.bikes = payload;
    },
    updateAthlete: (state, { payload }) => {
      const {
        id, username, firstname,
        lastname, premium, profile, weight,
        // eslint-disable-next-line camelcase
        profile_medium, resource_state, sex, updated_at, measurement_preference,
      } = payload;
      state.athlete = {
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
      };
      state.bikes = payload.bikes;
    },
    updateAuth: (state, { payload }) => { // git
      const {
        accessToken, expiresAt, expiresIn, refreshToken, tokenType,
      } = payload;
      const { auth } = state;
      auth.accessToken = accessToken;
      auth.expiresAt = expiresAt;
      auth.expiresIn = expiresIn;
      auth.refreshToken = refreshToken;
      auth.tokenType = tokenType;
    },
    syncStart: (state) => { // git
      state.startSync = true;
    },
    syncEnd: (state) => {
      state.startSync = false;
    },
    syncFailed: (state, payload) => {
      state.startSync = false;
      state.error = payload.error;
    },
  },
});
export const {
  updateBikes: stravaUpdateBikes,
  syncStart: stravaSyncStart,
  syncEnd: stravaSyncEnd,
  updateAthlete: stravaUpdateAthlete,
  updateAuth: stravaUpdateAuth,
  syncFailed: stravaSyncFailed,
} = stravaSlice.actions;

export default stravaSlice.reducer;
