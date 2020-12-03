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
            alerts: [],
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
    addAlert: {
      reducer: (state, { payload }) => {
        const compToEdit = state.find((component) => component.id === payload.componentId);
        if (compToEdit) {
          compToEdit.alerts.push(payload);
        }
      },
      prepare: (payload) => {
        const id = Math.random().toString(36).substring(7);
        const sharedProperty = {
          triggered: false,
          requireAction: false,
          serviced: false,
        };
        if (payload.type === 'distance') {
          return {
            payload: {
              id,
              ...payload,
              distanceAlert: true,
              startDistance: payload.componentDistance,
              endDistance: payload.componentDistance + payload.distance,
              dateAlert: false,
              endDate: null,
              repeatedPeriod: payload.repeatDistance,
              ...sharedProperty,
            },
          };
        } if (payload.type === 'date') {
          return {
            payload: {
              id,
              ...payload,
              dateAlert: true,
              endDate: payload.alertDate.toJSON(),
              repeatedPeriod: payload.repeatTimes,
              distanceAlert: false,
              startDistance: null,
              endDistance: null,
              ...sharedProperty,
            },
          };
        }
        return payload;
      },
    },
    deleteAlert: (state, { payload }) => {
      const compToEdit = state.find((component) => component.id === payload.componentId);
      if (compToEdit) {
        const alertIndex = compToEdit.alerts.findIndex((alert) => alert.id === payload.alertId);
        if (alertIndex !== -1) {
          compToEdit.alerts.splice(alertIndex, 1);
        }
      }
    },
    serviceComponent: (state, { payload }) => {
      const compToEdit = state.find((component) => component.id === payload.componentId);
      if (compToEdit) {
        const alert = compToEdit.alerts.find((alert) => alert.id === payload.alertId);
        if (alert) {
          alert.serviced = true;
          alert.requireAction = false;
        }
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
        compToEdit.alerts = [];
      }
    },
    retireAllWithBike: (state, { payload }) => {
      state.forEach((component) => {
        if (component.bikeId === payload.bikeId) {
          const componentToEdit = component;
          componentToEdit.retired = true;
          componentToEdit.alerts = [];
        }
      });
    },
    remove: (state, { payload }) => {
      const i = state.findIndex((component) => component.id === payload.componentId);
      if (i !== -1) {
        state.splice(i, 1);
      }
    },
    removeAllWithBike: (state, { payload }) => state.filter((elem) => elem.bikeId !== payload.bikeId),
  },
});

export const {
  create: addComponent,
  edit: editComponent,
  addAlert,
  serviceComponent,
  deleteAlert,
  switchToBike,
  retire: retireComponent,
  updateDistance: updateComponentsDistance,
  retireAllWithBike,
  remove: deleteComponent,
  removeAllWithBike: deleteAllWithBike,
} = bikeComponentsSlice.actions;

export default bikeComponentsSlice.reducer;
