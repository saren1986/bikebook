import * as actionTypes from './actionTypes';

export const setActiveBike = (bikeId) => ({
  type: actionTypes.SET_ACTIVE_BIKE,
  id: bikeId,
});

export const addBike = (bikeData) => ({
  type: actionTypes.ADD_BIKE,
  data: bikeData,
});

export const addComponent = (componentData) => ({
  type: actionTypes.ADD_COMPONENT,
  data: componentData,
});

export const addDistance = (distance) => ({
  type: actionTypes.ADD_DISTANCE,
  data: {
    distance,
  },
});

export const setDistanceAlert = (compId, distance) => ({
  type: actionTypes.SET_DISTANCE_ALERT,
  data: {
    compId,
    distance,
  },
});
