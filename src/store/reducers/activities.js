import { createSlice } from '@reduxjs/toolkit';
import activities from '../../mock/activities';

const initialState = [
  // ...activities,
];

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    create: {
      reducer: (state, { payload }) => {
        state.push(payload);
      },
      prepare: (payload) => ({
        payload: {
          id: Math.random().toString(36).substring(7),
          ...payload,
          strava: false,
          stravaType: null,
          stravaExternalId: null,
          elapsedTime: null,
        },
      }),
    },
    addFromStrava: (state, { payload }) => state.concat(payload),
    edit: (state, { payload }) => {
      const activityToEdit = state.find((activity) => activity.id === payload.id);
      if (activityToEdit) {
        activityToEdit.title = payload.title;
        activityToEdit.distance = payload.distance;
        activityToEdit.movingTime = payload.movingTime;
      }
    },
    remove: (state, { payload }) => {
      const i = state.findIndex((activity) => activity.id === payload.id && !activity.strava);
      if (i !== -1) {
        state.splice(i, 1);
      }
    },
    removeByBikeId: (state, { payload }) => state
      .filter((activity) => (activity.bikeId !== payload.bikeId) || activity.strava),
  },

});
export const {
  create,
  edit,
  remove,
  removeByBikeId: removeActivities,
  addFromStrava,
} = activitySlice.actions;
export default activitySlice.reducer;
