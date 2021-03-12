/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  startSync: false,
  sync: false,
  stravaId: null,
  auth: {
    accessToken: null,
    expiresAt: null,
    expiresIn: null,
    refreshToken: null,
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
  bikes: [],
  error: null,
};

const stravaSlice = createSlice({
  name: 'strava',
  initialState,
  reducers: {
    updateBikes: (state, { payload }) => {
      state.bikes = state.bikes.map((stateBike) => {
        const foundPayloadBike = payload.find((payloadBike) => stateBike.id === payloadBike.id);
        if (foundPayloadBike) {
          return {
            ...stateBike,
            ...foundPayloadBike,
          };
        }
        return stateBike;
      });
      state.bikes.push(...payload
        .filter((payloadBike) => state.bikes
          .findIndex((stateBike) => stateBike.id === payloadBike.id) === -1));
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
    },
    updateAuth: (state, { payload }) => {
      const {
        stravaId, stravaAccessToken, stravaExpiresAt, stravaExpiresIn, stravaRefresToken, tokenType,
      } = payload;
      const { auth } = state;
      auth.accessToken = stravaAccessToken;
      auth.expiresAt = stravaExpiresAt;
      auth.expiresIn = stravaExpiresIn;
      auth.refreshToken = stravaRefresToken;
      auth.tokenType = tokenType;
      state.stravaId = stravaId || state.stravaId;
    },
    syncStart: (state) => { 
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
