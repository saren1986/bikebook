/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  refreshToken: null,
  userId: null,
  username: '',
  exp: null,
  info: null,
  error: null,
  registerProcess: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, { payload }) => {
      const {
        accessToken, exp, username, userId,
      } = payload;
      state.accessToken = accessToken;
      state.exp = exp;
      state.username = username;
      state.userId = userId;
      state.error = null;
      state.info = null;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      state.expTime = null;
      state.username = null;
      state.userId = null;
      state.error = null;
      state.info = null;
    },
    setInitUser: (state, { payload }) => {
      state.username = payload.username;
      state.userId = payload.cognitoUserSub;
      state.registerProcess = true;
    },
    setError: (state, { payload }) => {
      state.error = payload.message;
      state.info = null;
    },
    setInfo: (state, { payload }) => {
      state.info = payload.message;
      state.error = null;
    },
  },
});

export const {
  setAccessToken,
  setError,
  clearAccessToken,
  setInitUser,
  setInfo,
} = authSlice.actions;

export default authSlice.reducer;
