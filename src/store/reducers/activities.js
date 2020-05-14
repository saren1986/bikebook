import * as actionTypes from '../actions/actionTypes';
import activities from '../../mock/activities';

const defaultState = [
  // ...activities,
];

const addActivitites = (state, action) => {
  return [
    ...state,
    ...action.data.activities,
  ];
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ACTIVITIES: return addActivitites(state, action);
    default: return state;
  }
};

export default reducer;
