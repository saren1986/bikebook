import { SET_ACTIVE_BIKE } from '../actions/actionTypes';

const defaultState = {
  activeBike: null,
};
const setActiveBike = (state, action) => ({
  ...state,
  activeBike: action.id,
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ACTIVE_BIKE: return setActiveBike(state, action);
    default: return state;
  }
};

export default reducer;
