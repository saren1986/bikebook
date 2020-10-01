import { SET_ACTIVE_BIKE } from './actionTypes';

export const setActiveBike = (bikeId) => ({
  type: SET_ACTIVE_BIKE,
  id: bikeId,
});
