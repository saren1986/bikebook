import * as actionTypes from './actionTypes';

export const openConfirmDialog = (title, description, confirm) => ({
  type: actionTypes.OPEN_CONFIRM_DIALOG,
  data: {
    title,
    description,
    confirm,
  },
});

export const closeConfirmDialog = (title, description, confirm) => ({
  type: actionTypes.CLOSE_CONFIRM_DIALOG,
  data: {
    title,
    description,
    confirm,
  },
});
