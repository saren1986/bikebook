import * as actionTypes from './actionTypes';
import { updateComponentsDistance } from './bikeComponents';

export const setActiveBike = (bikeId) => ({
  type: actionTypes.SET_ACTIVE_BIKE,
  id: bikeId,
});

export const addBike = (bikeData) => ({
  type: actionTypes.ADD_BIKE,
  data: bikeData,
});

export const addBikeDistance = (bikeId, distance) => ({
  type: actionTypes.ADD_BIKE_DISTANCE,
  data: {
    distance,
    bikeId,
  },
});

export const addDistance = (bikeId, distance) => (dispatch) => {
  dispatch(addBikeDistance(bikeId, distance));
  dispatch(updateComponentsDistance(bikeId, distance));
};
