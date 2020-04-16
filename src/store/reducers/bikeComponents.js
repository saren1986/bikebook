import * as actionTypes from '../actions/actionTypes';
import bikeComponents from '../../mock/bikeComponents';
import { kmToMeter } from '../../utils/distanceFormatters';

const defaultState = [
  ...bikeComponents,
];

const addComponent = (state, action) => {
  const { bike, component } = action.data;

  let distance = null;
  let date = null;
  const compAlert = {
    on: false,
    note: '',
  };
  if (component.distanceAlert) {
    compAlert.endDistance = kmToMeter(component.distanceAlert);
    compAlert.startDistance = kmToMeter(bike.distance);
    compAlert.on = true;
  }
  if (component.startDate === '1') {
    distance = bike.distance + kmToMeter(component.initialDistance);
    date = '1';
  } else if (component.startDate === '2') {
    distance += kmToMeter(component.initialDistance);
    date = new Date().toJSON().slice(0, 10);
  }
  return [
    ...state,
    {
      ...component,
      id: 'c111', // TODO
      bikeId: component.bikeId,
      retired: false,
      startDate: date,
      distance,
      alert: compAlert,
    },
  ];
};
const setDistanceAlert = (state, action) => state.map((component) => {
  if (component.id === action.data.compId) {
    return {
      ...component,
      alert: {
        on: true,
        startDistance: component.distance,
        endDistance: kmToMeter(action.data.endDistance) + component.distance,
      },
    };
  }
  return component;
});
const updateComponentsDistance = (state, action) => state.map((component) => {
  if (action.data.bikeId === component.bikeId) {
    return {
      ...component,
      alert: {
        ...component.alert,
      },
      distance: component.distance + kmToMeter(action.data.distance),
    };
  }
  return component;
});
const disableServiceAlert = (state, action) => state.map((component) => {
  if (component.id === action.data.compId) {
    return {
      ...component,
      alert: {
        on: false,
        startDistance: null,
        endDistance: null,
      },
    };
  }
  return component;
});
const switchToBike = (state, action) => state.map((component) => {
  if (component.id === action.data.compId) {
    return {
      ...component,
      alert: {
        ...component.alert,
      },
      bikeId: action.data.bikeId,
    };
  }
  return component;
});
const retireComponent = (state, action) => state.map((component) => {
  if (component.id === action.data.compId) {
    return {
      ...component,
      alert: {
        ...component.alert,
        on: false,
        startDistance: null,
        endDistance: null,
      },
      retired: true,
    };
  }
  return component;
});
const deleteComponent = (state, action) => state
  .filter((component) => component.id !== action.data.compId);

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COMPONENT: return addComponent(state, action);
    case actionTypes.SET_DISTANCE_ALERT: return setDistanceAlert(state, action);
    case actionTypes.UPDATE_COMPONENTS_DISTANCE: return updateComponentsDistance(state, action);
    case actionTypes.DISABLE_SERVICE_ALERT: return disableServiceAlert(state, action);
    case actionTypes.SWITCH_TO_BIKE: return switchToBike(state, action);
    case actionTypes.RETIRE_COMPONENT: return retireComponent(state, action);
    case actionTypes.DELETE_COMPONENT: return deleteComponent(state, action);
    default: return state;
  }
};

export default reducer;
