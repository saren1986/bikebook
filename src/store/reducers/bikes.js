import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const bikeSlice = createSlice({
  name: 'bike',
  initialState,
  reducers: {
    init: (state, { payload }) => {
      state.push(...payload);
    },
    addBikes: (state, { payload }) => {
      state.map((stateBike) => {
        const foundPayloadBike = payload.find((payloadBike) => stateBike.id === payloadBike.id);
        if (foundPayloadBike) {
          return {
            ...stateBike,
            ...foundPayloadBike,
          };
        }
        return stateBike;
      }); // TODO: TEST IT
      state.push(...payload
        .filter((payloadBike) => state
          .findIndex((stateBike) => stateBike.id === payloadBike.id) === -1));
    },
    create: (state, { payload }) => {
      state.push(payload);
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
  init,
  create: addBike,
  edit: editBike,
  updateDistance: updateBikeDistance,
  retire,
  remove,
  addBikes,
} = bikeSlice.actions;

export default bikeSlice.reducer;
