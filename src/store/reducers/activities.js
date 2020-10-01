import { ADD_ACTIVITIES, ADD_ACTIVITY, EDIT_ACTIVITY, REMOVE_ACTIVITY, REMOVE_ACTIVITIES } from '../actions/actionTypes';
import activities from '../../mock/activities';
import { timeToSeconds } from '../../utils/timeFormatters';

const defaultState = [
  ...activities,
];

const addActivitites = (state, action) => [
  ...state,
  ...action.data.activities,
];

const addActivity = (state, action) => {
  const { components } = action.data;
  const { movingTime, startDate } = action.data.activity;
  const formattedMovingTime = timeToSeconds(movingTime);
  const formattedDate = startDate.toJSON();
  return [
    ...state,
    {
      ...action.data.activity,
      strava: false,
      stravaType: null,
      stravaExternalId: null,
      elapsedTime: null,
      movingTime: formattedMovingTime,
      startDate: formattedDate,
      components,
    },
  ];
};
const editActivity = (state, action) => {
  const {
    id, movingTime, startDate,
  } = action.data.activity;
  const formattedMovingTime = timeToSeconds(movingTime);
  const formattedDate = startDate.toJSON();
  return state.map((activity) => {
    if (activity.id === id) {
      return {
        ...activity,
        ...action.data.activity,
        movingTime: formattedMovingTime,
        startDate: formattedDate,
      };
    }
    return activity;
  });
};
const removeActivity = (state, action) => state
  .filter((activity) => (activity.id !== action.data.id) || activity.strava);

const removeActivities = (state, action) => state
  .filter((activity) => (activity.bikeId !== action.data.bikeId) || activity.strava);

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ACTIVITIES: return addActivitites(state, action);
    case ADD_ACTIVITY: return addActivity(state, action);
    case EDIT_ACTIVITY: return editActivity(state, action);
    case REMOVE_ACTIVITY: return removeActivity(state, action);
    case REMOVE_ACTIVITIES: return removeActivities(state, action);
    default: return state;
  }
};

export default reducer;
