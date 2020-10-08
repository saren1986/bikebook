import { updateBikeDistance } from '../reducers/bikes';
import { updateComponentsDistance } from '../reducers/bikeComponents';
import { create, edit, remove } from '../reducers/activities';

export const updateActivity = (activity, distanceDiffrence) => (dispatch) => {
  dispatch(edit(activity));
  dispatch(updateComponentsDistance({
    components: activity.components,
    distance: distanceDiffrence,
  }));
  dispatch(updateBikeDistance({
    bikeId: activity.bikeId,
    distance: distanceDiffrence,
  }));
};
export const addActivity = (activity) => (dispatch) => {
  dispatch(create(activity));
  dispatch(updateBikeDistance({
    bikeId: activity.bikeId,
    distance: activity.distance,
  }));
  dispatch(updateComponentsDistance({
    components: activity.components,
    distance: activity.distance,
  }));
};
export const removeActivity = (activity) => (dispatch) => {
  dispatch(updateBikeDistance({
    bikeId: activity.bikeId,
    distance: -activity.distance,
  }));
  dispatch(updateComponentsDistance({
    components: activity.components,
    distance: -activity.distance,
  }));
  dispatch(remove({
    id: activity.id,
  }));
};
