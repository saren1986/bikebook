import * as actionTypes from '../actions/actionTypes';
import bikes from '../../mock/bikes';

const defaultState = {
  list: bikes,
  activeBike: 'b1145059', // null,
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

const updateBikeDistance = (state, action) => {
  const newBikeList = state.list.map((bike) => {
    if (bike.id === action.data.bikeId) {
      const resultDistance = bike.distance + action.data.distance;
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

const retireBike = (state, action) => {
  const { bikeId } = action.data;
  const bikeList = state.list.map((bike) => {
    if (bike.id === bikeId) {
      return {
        ...bike,
        retired: true,
      };
    }
    return bike;
  });
  return {
    ...state,
    list: bikeList,
  };
};
const deleteBike = (state, action) => ({
  ...state,
  list: state.list.filter((bike) => (bike.id !== action.data.bikeId) || bike.strava),
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BIKE: return addBike(state, action);
    case actionTypes.EDIT_BIKE: return editBike(state, action);
    case actionTypes.SET_ACTIVE_BIKE: {
      return setActiveBike(state, action);
    }
    case actionTypes.UPDATE_BIKE_DISTANCE: return updateBikeDistance(state, action);
    case actionTypes.RETIRE_BIKE: return retireBike(state, action);
    case actionTypes.DELETE_BIKE: return deleteBike(state, action);
    default: return state;
  }
};

export default reducer;
