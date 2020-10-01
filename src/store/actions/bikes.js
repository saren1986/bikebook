import * as actionTypes from './actionTypes';
import { deleteComponents, retireComponents } from './bikeComponents';
import { removeActivities } from './activities';

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

const retire = (bikeId) => ({
  type: actionTypes.RETIRE_BIKE,
  data: {
    bikeId,
  },
});
const remove = (bikeId) => ({
  type: actionTypes.DELETE_BIKE,
  data: {
    bikeId,
  },
});

export const deleteBike = (bikeId) => (dispatch) => {
  dispatch(remove(bikeId));
  dispatch(deleteComponents(bikeId));
  dispatch(removeActivities(bikeId));
};
export const retireBike = (bikeId) => (dispatch) => {
  dispatch(retire(bikeId));
  dispatch(retireComponents(bikeId));
};
