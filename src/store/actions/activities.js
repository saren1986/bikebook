import {
  ADD_ACTIVITIES, ADD_ACTIVITY, EDIT_ACTIVITY, REMOVE_ACTIVITY, REMOVE_ACTIVITIES, 
} from './actionTypes';
import { updateBikeDistance } from '../reducers/bikes';
import { updateComponentsDistance } from './bikeComponents';

export const addActivities = (activities) => ({
  type: ADD_ACTIVITIES,
  data: {
    activities,
  },
});

const add = (activity, components) => ({
  type: ADD_ACTIVITY,
  data: {
    activity,
    components,
  },
});
const edit = (activity, components) => ({
  type: EDIT_ACTIVITY,
  data: {
    activity,
    components,
  },
});
const remove = (id) => ({
  type: REMOVE_ACTIVITY,
  data: {
    id,
  },
});
export const removeActivities = (bikeId) => ({
  type: REMOVE_ACTIVITIES,
  data: {
    bikeId,
  },
});

export const updateActivity = (activity, bikeId, components, distanceDiffrence) => (dispatch) => {
  dispatch(edit(activity));
  dispatch(updateComponentsDistance(components, distanceDiffrence));
  dispatch(updateBikeDistance({
    bikeId,
    distance: distanceDiffrence,
  }));
};
export const addActivity = (activity, components) => (dispatch) => {
  dispatch(add(activity, components));
  dispatch(updateBikeDistance({
    bikeId: activity.bikeId,
    distance: activity.distance,
  }));
  dispatch(updateComponentsDistance(components, activity.distance));
};
export const removeActivity = (activity, components) => (dispatch) => {
  dispatch(updateBikeDistance({
    bikeId: activity.bikeId,
    distance: -activity.distance,
  }));
  dispatch(updateComponentsDistance(components, -activity.distance));
  dispatch(remove(activity.id));
};
