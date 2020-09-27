import { ADD_ACTIVITIES, ADD_ACTIVITY, EDIT_ACTIVITY } from './actionTypes';
import { updateBikeDistance } from './bikes';
import { updateComponentsDistance } from './bikeComponents';

export const addActivities = (activities) => ({
  type: ADD_ACTIVITIES,
  data: {
    activities,
  },
});

const addActivity = (activity, components) => ({
  type: ADD_ACTIVITY,
  data: {
    activity,
    components,
  },
});
const editActivity = (activity, components) => ({
  type: EDIT_ACTIVITY,
  data: {
    activity,
    components,
  },
});
export const updateActivity = (activity, bikeId, components, distanceDiffrence) => (dispatch) => {
  dispatch(editActivity(activity));
  dispatch(updateComponentsDistance(components, distanceDiffrence));
  dispatch(updateBikeDistance(bikeId, distanceDiffrence));
};
export const addNewActivity = (activity, components) => (dispatch) => {
  dispatch(addActivity(activity, components));
  dispatch(updateBikeDistance(activity.bikeId, activity.distance));
  dispatch(updateComponentsDistance(components, activity.distance));
};
