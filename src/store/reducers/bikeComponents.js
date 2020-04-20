import * as actionTypes from '../actions/actionTypes';
import bikeComponents from '../../mock/bikeComponents';
import * as format from '../../utils/distanceFormatters';

const defaultState = [
  ...bikeComponents,
];

const addComponent = (state, action) => {
  const { bike, lengthUnit } = action.data;
  const {
    initialDistance, alertOn, endDistance, ...component
  } = action.data.component;

  let distance = 0;
  let date = '1';

  if (component.startDate === '1') {
    distance = bike.distance + format.distanceLargeToSmall(initialDistance, lengthUnit);
  } else if (component.startDate === '2') {
    distance += format.distanceLargeToSmall(initialDistance, lengthUnit);
    date = new Date().toJSON().slice(0, 10);
  }

  return [
    ...state,
    {
      id: 'c111', // TODO
      bikeId: component.bikeId,
      ...component,
      retired: false,
      startDate: date,
      distance,
      alert: {
        on: alertOn,
        note: '',
        startDistance: 0 + format.distanceLargeToSmall(initialDistance, lengthUnit),
        endDistance: distance
        + format.distanceLargeToSmall(endDistance, action.data.lengthUnit),
      },
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
        endDistance: component.distance
        + format.distanceLargeToSmall(action.data.endDistance, action.data.lengthUnit),
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
      distance: component.distance
      + format.distanceLargeToSmall(action.data.distance, action.data.lengthUnit),
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
