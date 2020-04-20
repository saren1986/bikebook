import * as actionTypes from './actionTypes';

export const setDistanceAlert = (compId, endDistance, lengthUnit) => ({
  type: actionTypes.SET_DISTANCE_ALERT,
  data: {
    compId,
    endDistance,
    lengthUnit,
  },
});
export const addComponent = (component, bike, lengthUnit) => ({
  type: actionTypes.ADD_COMPONENT,
  data: {
    bike,
    component,
    lengthUnit,
  },
});

export const updateComponentsDistance = (bikeId, distance, lengthUnit) => ({
  type: actionTypes.UPDATE_COMPONENTS_DISTANCE,
  data: {
    bikeId,
    distance,
    lengthUnit,
  },
});

export const disableServiceAlert = (compId) => ({
  type: actionTypes.DISABLE_SERVICE_ALERT,
  data: {
    compId,
  },
});

export const switchToBike = (compId, bikeId) => ({
  type: actionTypes.SWITCH_TO_BIKE,
  data: {
    compId,
    bikeId,
  },
});
export const retireComponent = (compId) => ({
  type: actionTypes.RETIRE_COMPONENT,
  data: {
    compId,
  },
});
export const deleteComponent = (compId) => ({
  type: actionTypes.DELETE_COMPONENT,
  data: {
    compId,
  },
});
