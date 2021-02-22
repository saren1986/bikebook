/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  refreshToken: null,
  userId: null,
  username: '',
  exp: null,
  error: null,
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
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      state.expTime = null;
      state.username = null;
      state.userId = null;
    },
    setError: (state, { payload }) => {
      state.error = payload.message;
    },
  },
});

export const {
  setAccessToken,
  setError,
  clearAccessToken,
} = authSlice.actions;

export default authSlice.reducer;
