import * as actionTypes from './actionTypes';

export const setDistanceAlert = (compId, endDistance, lengthUnit) => ({
  type: actionTypes.SET_DISTANCE_ALERT,
  data: {
    compId,
    endDistance,
    lengthUnit,
  },
});
export const addComponent = (component, bike, lengthUnit, massUnit, activities) => ({
  type: actionTypes.ADD_COMPONENT,
  data: {
    bike,
    component,
    lengthUnit,
    massUnit,
    activities,
  },
});
export const editComponent = (compId, component, massUnit) => ({
  type: actionTypes.EDIT_COMPONENT,
  data: {
    compId,
    component,
    massUnit,
  },
});

export const updateComponentsDistance = (componentList, distance) => ({
  type: actionTypes.UPDATE_COMPONENTS_DISTANCE,
  data: {
    componentList,
    distance,
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
