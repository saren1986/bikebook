import {
  ADD_COMPONENT, EDIT_COMPONENT, SET_DISTANCE_ALERT,
  UPDATE_COMPONENTS_DISTANCE, DISABLE_SERVICE_ALERT, SWITCH_TO_BIKE,
  RETIRE_COMPONENT, RETIRE_COMPONENTS, DELETE_COMPONENT, DELETE_COMPONENTS,
} from '../actions/actionTypes';
import bikeComponents from '../../mock/bikeComponents';
import * as format from '../../utils/distanceFormatters';
import { formatMassLargeToSmall } from '../../utils/massUnitsFormatter';

const defaultState = [
  ...bikeComponents,
];

const addComponent = (state, action) => {
  const {
    bike, lengthUnit, massUnit, activities,
  } = action.data;
  const {
    distance, weight, startDate, fromBegining, ...component
  } = action.data.component;

  let formattedDistance = 0;
  let date = null;
  const bikeActivities = activities.filter((activity) => activity.bikeId === bike.id);
  if (fromBegining) {
    formattedDistance = bike.distance + format.distanceLargeToSmall(distance, lengthUnit);
    const foundActivities = bikeActivities
      .sort(
        (a, b) => new Date(a.startDate) > new Date(b.startDate),
      );
    if (foundActivities.length) {
      date = foundActivities[0].startDate;
    } else {
      date = startDate.toJSON();
    }
  } else {
    const compDistance = bikeActivities
      .filter((activity) => new Date(activity.startDate).getTime() < startDate.getTime())
      .reduce((sum, activity) => sum + activity.distance, 0);
    formattedDistance = format.distanceLargeToSmall(distance, lengthUnit) + compDistance;
    date = startDate.toJSON();
  }
  const formattedWeight = weight ? formatMassLargeToSmall(weight, massUnit) : '';

  return [
    ...state,
    {
      bikeId: component.bikeId,
      ...component,
      retired: false,
      startDate: date,
      distance: formattedDistance,
      weight: formattedWeight,
      alert: {
        on: false,
        note: '',
        startDistance: 0,
        endDistance: 0,
      },
    },
  ];
};
const editComponent = (state, action) => {
  const {
    massUnit, compId,
  } = action.data;
  return state.map((comp) => {
    if (comp.id === compId) {
      const {
        weight, ...component
      } = action.data.component;
      const formattedWeight = weight ? formatMassLargeToSmall(weight, massUnit) : '';
      return {
        ...comp,
        ...component,
        bikeId: component.bikeId,
        weight: formattedWeight,
      };
    }
    return comp;
  });
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
  if (action.data.componentList.findIndex((c) => c === component.id) !== -1) {
    return {
      ...component,
      distance: component.distance + action.data.distance,
      alert: {
        ...component.alert,
      },
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
const retireComponents = (state, action) => state.map((component) => {
  if (component.bikeId === action.data.bikeId) {
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
const deleteComponents = (state, action) => state
  .filter((component) => component.bikeId !== action.data.bikeId);

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_COMPONENT: return addComponent(state, action);
    case EDIT_COMPONENT: return editComponent(state, action);
    case SET_DISTANCE_ALERT: return setDistanceAlert(state, action);
    case UPDATE_COMPONENTS_DISTANCE: return updateComponentsDistance(state, action);
    case DISABLE_SERVICE_ALERT: return disableServiceAlert(state, action);
    case SWITCH_TO_BIKE: return switchToBike(state, action);
    case RETIRE_COMPONENT: return retireComponent(state, action);
    case RETIRE_COMPONENTS: return retireComponents(state, action);
    case DELETE_COMPONENT: return deleteComponent(state, action);
    case DELETE_COMPONENTS: return deleteComponents(state, action);
    default: return state;
  }
};

export default reducer;
