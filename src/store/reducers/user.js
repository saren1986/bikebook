import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  username: null,
  email: null,
  stravaId: null,
  stravaAccessToken: null,
  stravaAthlete: null,
  stravaExpiresAt: null,
  stravaExpiresIn: null,
  stravaRefresToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      const {
        id, email, username, stravaId, stravaAccessToken, stravaAthlete,
        stravaExpiresAt, stravaExpiresIn, stravaRefresToken,
      } = payload;
      state.id = id;
      state.username = username;
      state.email = email;
      state.stravaId = stravaId;
      state.stravaAccessToken = stravaAccessToken;
      state.stravaAthlete = stravaAthlete;
      state.stravaExpiresAt = stravaExpiresAt;
      state.stravaExpiresIn = stravaExpiresIn;
      state.stravaRefresToken = stravaRefresToken;
    },
  },
});

export const {
  setUser,
} = userSlice.actions;

export default userSlice.reducer;
