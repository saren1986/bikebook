import * as actionTypes from '../actions/actionTypes';

const defaultState = {
  units: {
    lengthUnit: 'km',
    massUnit: 'kg',
  },
};


const reducer = (state = defaultState, action) => {
  switch (action.type) {

    default:
      return state;
  }
};

export default reducer;
