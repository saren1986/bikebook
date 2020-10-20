/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeBike: 'n1',
  units: {
    lengthUnit: 'km',
    massUnit: 'kg',
  },
};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setActiveBike: (state, { payload }) => {
      state.activeBike = payload;
    },
  },
});

export const {
  setActiveBike,
} = optionsSlice.actions;

export default optionsSlice.reducer;
