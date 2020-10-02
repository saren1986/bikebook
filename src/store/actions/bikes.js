import { deleteComponents, retireComponents } from './bikeComponents';
import { retire, remove } from '../reducers/bikes';
import { removeActivities } from './activities';

export const deleteBike = (bikeId) => (dispatch) => {
  dispatch(remove({ bikeId }));
  dispatch(deleteComponents(bikeId));
  dispatch(removeActivities(bikeId));
};
export const retireBike = (bikeId) => (dispatch) => {
  dispatch(retire({ bikeId }));
  dispatch(retireComponents(bikeId));
};
