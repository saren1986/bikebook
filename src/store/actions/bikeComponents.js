import * as actionTypes from './actionTypes';

export const setDistanceAlert = (compId, endDistance) => ({
  type: actionTypes.SET_DISTANCE_ALERT,
  data: {
    compId,
    endDistance,
  },
});
export const addComponent = (componentData, bikeData) => ({
  type: actionTypes.ADD_COMPONENT,
  data: {
    bike: bikeData,
    component: componentData,
  },
});

export const updateComponentsDistance = (bikeId, distance) => ({
  type: actionTypes.UPDATE_COMPONENTS_DISTANCE,
  data: {
    bikeId,
    distance,
  },
});

export const disableServiceAlert = (compId) => ({
  type: actionTypes.DISABLE_SERVICE_ALERT,
  data: {
    compId,
  }
});
