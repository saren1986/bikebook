import * as actionTypes from '../actions/actionTypes';

const defaultState = {
  confirmDialog: {
    open: false,
    title: 'Alert',
    description: null,
    confirm: null,
  },
};

const openConfirmDialog = (state, action) => ({
  ...state,
  confirmDialog: {
    open: true,
    title: action.data.title,
    description: action.data.description,
    confirm: action.data.confirm,
  },
});
const closeConfirmDialog = (state) => ({
  ...state,
  confirmDialog: {
    open: false,
    title: 'Alert',
    description: null,
    confirm: null,
  },
});


const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_CONFIRM_DIALOG: return openConfirmDialog(state, action);
    case actionTypes.CLOSE_CONFIRM_DIALOG: return closeConfirmDialog(state);
    default: return state;
  }
};

export default reducer;
