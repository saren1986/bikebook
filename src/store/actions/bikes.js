import * as actionTypes from './actionTypes';

export const setActiveBike = (bikeId) => ({
  type: actionTypes.SET_ACTIVE_BIKE,
  id: bikeId,
});

export const addBike = (bike) => ({
  type: actionTypes.ADD_BIKE,
  data: {
    bike,
  },
});
export const editBike = (bike) => ({
  type: actionTypes.EDIT_BIKE,
  data: {
    bike,
  },
});

export const updateBikeDistance = (bikeId, distance) => ({
  type: actionTypes.UPDATE_BIKE_DISTANCE,
  data: {
    distance,
    bikeId,
  },
});
