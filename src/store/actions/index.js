export {
  addBike,
  editBike,
} from '../reducers/bikes';
export {
  retireBike,
  deleteBike,
} from './bikes';
export {
  addComponent,
  editComponent,
  setDistanceAlert,
  disableAlert,
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
  stravaGetBike,
  checkStravaAuth,
  stravaGetAthlete,
  stravaGetActivities,
  stravaCheckForUpdate,
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
