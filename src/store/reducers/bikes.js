import * as actionTypes from '../actions/actionTypes';
import bikes from '../../mock/bikes';

const defaultState = [
  // ...bikes,
];

const addBike = (state, action) => [
  ...state,
  {
    ...action.data.bike,
    retired: false,
    strava: false,
  },
];

const editBike = (state, action) => state.map((stateBike) => {
  if (stateBike.id === action.data.bike.id) {
    return {
      ...stateBike,
      ...action.data.bike,
    };
  }
  return stateBike;
});

const updateBikeDistance = (state, action) => state.map((bike) => {
  if (bike.id === action.data.bikeId) {
    const resultDistance = bike.distance + action.data.distance;
    return {
      ...bike,
      distance: resultDistance,
    };
  }
  return bike;
});

const retireBike = (state, action) => {
  return state.map((bike) => {
    if (bike.id === action.data.bikeId) {
      return {
        ...bike,
        retired: true,
      };
    }
    return bike;
  });
};
const deleteBike = (state, action) => state
  .filter((bike) => (bike.id !== action.data.bikeId) || bike.strava);

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BIKE: return addBike(state, action);
    case actionTypes.EDIT_BIKE: return editBike(state, action);
    case actionTypes.UPDATE_BIKE_DISTANCE: return updateBikeDistance(state, action);
    case actionTypes.RETIRE_BIKE: return retireBike(state, action);
    case actionTypes.DELETE_BIKE: return deleteBike(state, action);
    default: return state;
  }
};

export default reducer;
