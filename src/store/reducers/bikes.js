import * as actionTypes from '../actions/actionTypes';
import bikes from '../../mock/bikes';
import * as format from '../../utils/distanceFormatters';

const defaultState = {
  list: bikes,
  activeBike: null,
};
const setActiveBike = (state, action) => ({
  ...state,
  activeBike: action.id,
});

const addBike = (state, action) => {
  const { bike } = action.data;
  return {
    ...state,
    list: [
      ...state.list,
      {
        // id: 'b100', //TODO nowy bikeID z serwera
        ...bike,
        retired: false,
        distance: bike.distance,
      },
    ],
  };
};

const editBike = (state, action) => {
  const { bike } = action.data;
  const bikeList = state.list.map((b) => {
    if (b.id === bike.id) {
      return {
        ...bike,
        retired: false,
        distance: b.distance,
      };
    }
    return b;
  });
  return {
    ...state,
    list: bikeList,
  };
};

const addDistance = (state, action) => {
  const newDistance = format.distanceLargeToSmall(action.data.distance, action.data.lengthUnit);
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
    case actionTypes.EDIT_BIKE: return editBike(state, action);
    case actionTypes.SET_ACTIVE_BIKE: {
      return setActiveBike(state, action);
    }
    case actionTypes.ADD_BIKE_DISTANCE: return addDistance(state, action);
    default: return state;
  }
};

export default reducer;
