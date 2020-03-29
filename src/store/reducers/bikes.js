import * as actionTypes from '../actions/actionTypes';
import bikes from '../../mock/bikes';
import * as convert from '../../utils/distanceFormatters';
import { getArrayIndexById } from '../utils';
import { kmToMeter } from '../../utils/distanceFormatters';


const defaultState = {
  list: bikes,
  activeBike: '1',
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
const updateComponentsDistance = (components, newDistance) => components.map((component) => ({
  ...component,
  distance: component.distance + newDistance,
}));

const addDistance = (state, action) => {
  const newDistance = kmToMeter(action.data.distance);
  const bikeList = [...state.list];
  const i = getArrayIndexById(bikeList, state.activeBike);
  bikeList[i].distance += newDistance;
  bikeList[i].components = updateComponentsDistance(state.list[i].components, newDistance);
  return {
    ...state,
    list: bikeList,
  };
};

const addComponent = (state, action) => {
  const bikeList = [...state.list];
  const { startDate, initialDistance } = { ...action.data };
  const i = getArrayIndexById(bikeList, state.activeBike);
  const currentBikeData = { ...state.list[i] };
  let { distanceAlert } = { ...action.data };
  let distance = null;
  let date = null;
  if (distanceAlert) {
    distanceAlert = kmToMeter(action.data.distanceAlert);
  }
  if (startDate === '1') {
    distance = currentBikeData.distance + kmToMeter(initialDistance);
    date = '1';
  } else if (startDate === '2') {
    distance += kmToMeter(initialDistance);
    date = new Date().toJSON().slice(0, 10);
  }
  bikeList[i].components.push({
    ...action.data,
    id: 'c111', // TODO
    distance,
    startDate: date,
    distanceAlert,
  });

  return {
    ...state,
    list: bikeList,
  };
};
const setDistanceAlert = (state, action) => {
  const bikeList = [...state.list];
  const i = getArrayIndexById(bikeList, state.activeBike);
  const compIndex = bikeList[i].components
    .findIndex(((comp) => comp.id === action.data.compId));
  bikeList[i].components[compIndex].distanceAlert = kmToMeter(action.data.distance);
  return {
    ...state,
    list: bikeList,
  };
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BIKE: return addBike(state, action);
    case actionTypes.ADD_COMPONENT: return addComponent(state, action);
    case actionTypes.SET_ACTIVE_BIKE: return setActiveBike(state, action);
    case actionTypes.ADD_DISTANCE: return addDistance(state, action);
    case actionTypes.SET_DISTANCE_ALERT: return setDistanceAlert(state, action);
    default: return state;
  }
};

export default reducer;
