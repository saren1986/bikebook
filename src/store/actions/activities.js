import * as actionTypes from './actionTypes';

export const addActivities = (activities) => ({
  type: actionTypes.ADD_ACTIVITIES,
  data: {
    activities,
  },
});
