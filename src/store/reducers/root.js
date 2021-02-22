export const RESET_APP = 'RESET_APP';

export const resetAppStore = () => ({
  type: RESET_APP,
});

export const resetReducer = (appReducer) => (state, action) => {
  if (action.type === 'RESET_APP') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return appReducer(state, action);
};
