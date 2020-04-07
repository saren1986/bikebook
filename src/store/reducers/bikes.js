import * as actionTypes from '../actions/actionTypes';
import bikes from '../../mock/bikes';
import * as convert from '../../utils/distanceFormatters';
import { kmToMeter } from '../../utils/distanceFormatters';

const defaultState = {
  list: bikes,
  activeBike: 'b1',
};
const setActiveBike = (state, action) => ({
  ...state,
  activeBike: action.id,
});

const addBike = (state, action) => {
  const newBike = {
    ...action.data,
    components: [],
    retired: false,
    distance: convert.kmToMeter(action.data.distance),
  };
  return {
    ...state,
    list: [
      ...state.list,
      newBike,
    ],
  };
};

const addDistance = (state, action) => {
  const newDistance = kmToMeter(action.data.distance);
  const newBikeList = state.list.map((bike) => {
    if (bike.id === action.data.bikeId) {
      const resultDistance = bike.distance + newDistance;
      return {
        ...bike,
        distance: resultDistance,
      };
    }
    return bike;
  });
  return {
    ...state,
    list: newBikeList,
  };
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BIKE: return addBike(state, action);
    case actionTypes.SET_ACTIVE_BIKE: return setActiveBike(state, action);
    case actionTypes.ADD_BIKE_DISTANCE: return addDistance(state, action);
    default: return state;
  }
};

export default reducer;
