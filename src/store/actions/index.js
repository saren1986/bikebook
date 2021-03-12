export {
  setUser,
}
  from '../reducers/user';
export {
  getUser,
} from './user';
export {
  signIn,
  signOut,
  initAuth,
  register,
  confirmRegister,
  resendConfirmationCode,
} from './auth';
export {
  addBike,
  editBike,
} from '../reducers/bikes';
export {
  retireBike,
  deleteBike,
  initState,
  // getUnsyncBikes,
} from './bikes';
export {
  addComponent,
  editComponent,
  addAlert,
  deleteAlert,
  serviceComponent,
  switchToBike,
  retireComponent,
  deleteComponent,
  deleteAllWithBike,
} from '../reducers/bikeComponents';
export {
  openConfirmDialog,
  closeConfirmDialog,
} from '../reducers/ux';
export {
  stravaSync,
  fetchBikes,
} from './strava';
export {
  stravaSyncStart,
  stravaSyncEnd,
  stravaUpdateBikes,
  stravaUpdateAthlete,
  stravaUpdateAuth,
  stravaSyncFailed,
} from '../reducers/strava';

export {
  addActivity,
  updateActivity,
  removeActivity,
} from './activities';
export {
  setActiveBike,
} from '../reducers/options';
