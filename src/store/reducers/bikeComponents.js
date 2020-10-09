import { createSlice } from '@reduxjs/toolkit';
import bikeComponents from '../../mock/bikeComponents';

const initialState = [
  ...bikeComponents,
];

const bikeComponentsSlice = createSlice({
  name: 'component',
  initialState,
  reducers: {
    create: {
      reducer: (state, { payload }) => {
        state.push(payload.component);
      },
      prepare: (payload) => ({
        payload: {
          ...payload,
          component: {
            ...payload.component,
            id: Math.random().toString(36).substring(7),
            retired: false,
            alert: {
              on: false,
              note: '',
              startDistance: 0,
              endDistance: 0,
            },
          },
        },
      }),
    },
    edit: (state, { payload }) => {
      const {
        id, bikeId, type, brand, model, weight, description,
      } = payload.component;
      const compToEdit = state.find((component) => component.id === id);
      if (compToEdit) {
        compToEdit.bikeId = bikeId;
        compToEdit.type = type;
        compToEdit.brand = brand;
        compToEdit.model = model;
        compToEdit.weight = weight;
        compToEdit.description = description;
      }
    },
    setDistanceAlert: (state, { payload }) => {
      const compToEdit = state.find((component) => component.id === payload.componentId);
      if (compToEdit) {
        compToEdit.alert.on = true;
        compToEdit.alert.startDistance = compToEdit.distance;
        compToEdit.alert.endDistance = compToEdit.distance
        + payload.alertDistance;
      }
    },
    disableAlert: (state, { payload }) => {
      const compToEdit = state.find((component) => component.id === payload.componentId);
      if (compToEdit) {
        compToEdit.alert.on = false;
        compToEdit.alert.startDistance = 0;
        compToEdit.alert.endDistance = 0;
      }
    },
    updateDistance: (state, { payload }) => {
      payload.components.forEach((id) => {
        const compToEdit = state.find((component) => component.id === id);
        if (compToEdit) {
          compToEdit.distance += payload.distance;
        }
      });
    },
    switchToBike: (state, { payload }) => {
      const compToEdit = state.find((component) => component.id === payload.componentId);
      if (compToEdit) {
        compToEdit.bikeId = payload.bikeId;
      }
    },
    retire: (state, { payload }) => {
      const compToEdit = state.find((component) => component.id === payload.componentId);
      if (compToEdit) {
        compToEdit.retired = true;
        compToEdit.alert.on = false;
        compToEdit.alert.startDistance = 0;
        compToEdit.alert.endDistance = 0;
      }
    },
    retireAllWithBike: (state, { payload }) => {
      state.forEach((component) => {
        if (component.bikeId === payload.bikeId) {
          const componentToEdit = component;
          componentToEdit.retired = true;
          componentToEdit.alert.on = false;
          componentToEdit.alert.startDistance = 0;
          componentToEdit.alert.endDistance = 0;
        }
      });
    },
    remove: (state, { payload }) => {
      const i = state.findIndex((component) => component.id === payload.componentId);
      if (i !== -1) {
        state.splice(i, 1);
      }
    },
    removeAllWithBike: (state, { payload }) => {
      return state.filter((elem) => elem.bikeId !== payload.bikeId);
    },
  },
});

export const {
  create: addComponent,
  edit: editComponent,
  setDistanceAlert,
  disableAlert,
  switchToBike,
  retire: retireComponent,
  updateDistance: updateComponentsDistance,
  retireAllWithBike,
  remove: deleteComponent,
  removeAllWithBike: deleteAllWithBike,
} = bikeComponentsSlice.actions;

export default bikeComponentsSlice.reducer;
