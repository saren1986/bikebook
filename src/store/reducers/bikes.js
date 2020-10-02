import { createSlice } from '@reduxjs/toolkit';
import bikes from '../../mock/bikes';

const initialState = [
  ...bikes,
];

const bikeSlice = createSlice({
  name: 'bike',
  initialState,
  reducers: {
    create: {
      reducer: (state, { payload }) => {
        state.push(payload);
      },
      prepare: (payload) => ({
        payload: {
          id: Math.random().toString(36).substring(7),
          ...payload,
          retired: false,
          strava: false,
        },
      }),
    },
    edit: (state, { payload }) => {
      const bikeToEdit = state.find((stateBike) => stateBike.id === payload.id);
      if (bikeToEdit) {
        const {
          brand, description, model, name, type, weight,
        } = payload;
        bikeToEdit.brand = brand;
        bikeToEdit.description = description;
        bikeToEdit.model = model;
        bikeToEdit.name = name;
        bikeToEdit.type = type;
        bikeToEdit.weight = weight;
      }
    },
    remove: (state, { payload }) => {
      const i = state.findIndex((bike) => (bike.id === payload.bikeId) && !bike.strava);
      if (i !== -1) {
        state.splice(i, 1);
      }
    },
    retire: (state, { payload }) => {
      const bikeToEdit = state.find((stateBike) => stateBike.id === payload.bikeId);
      if (bikeToEdit) {
        bikeToEdit.retired = true;
      }
    },
    updateDistance: (state, { payload }) => {
      const bikeToEdit = state.find((stateBike) => stateBike.id === payload.bikeId);
      if (bikeToEdit) {
        bikeToEdit.distance += payload.distance;
      }
    },
  },
});

export const {
  create: addBike,
  edit: editBike,
  updateDistance: updateBikeDistance,
  retire,
  remove,
} = bikeSlice.actions;

export default bikeSlice.reducer;
