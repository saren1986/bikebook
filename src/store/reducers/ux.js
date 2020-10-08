import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  confirmDialog: {
    open: false,
    title: 'Alert',
    description: '',
    confirm: () => {},
  },
};

const uxSlice = createSlice({
  name: 'ux',
  initialState,
  reducers: {
    openConfirmDialog: (state, { payload }) => {
      const { confirmDialog } = state;
      confirmDialog.open = true;
      confirmDialog.title = payload.title;
      confirmDialog.description = payload.description;
      confirmDialog.confirm = payload.confirm;
    },
    closeConfirmDialog: (state) => {
      const { confirmDialog } = state;
      confirmDialog.open = false;
      confirmDialog.title = 'Alert';
      confirmDialog.description = '';
      confirmDialog.confirm = () => {};
    },
  },
});

export const {
  openConfirmDialog,
  closeConfirmDialog,
} = uxSlice.actions;

export default uxSlice.reducer;
