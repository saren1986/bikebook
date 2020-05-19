import * as actionTypes from './actionTypes';
import { updateComponentsDistance } from './bikeComponents';

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

export const addBikeDistance = (bikeId, distance, lengthUnit) => ({
  type: actionTypes.ADD_BIKE_DISTANCE,
  data: {
    distance,
    bikeId,
    lengthUnit,
  },
});


export const addDistance = (bikeId, distance, lengthUnit) => (dispatch) => {
  dispatch(addBikeDistance(bikeId, distance, lengthUnit));
  dispatch(updateComponentsDistance(bikeId, distance, lengthUnit));
};
