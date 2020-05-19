import { stravaDateFormatter } from './timeFormatters';

export const convertStravaActivities = (activities, bikesId) => activities
  .filter((act) => bikesId
    .findIndex((id) => act.gear_id === id) !== -1)
  .map((act) => ({
    id: act.id,
    strava: !!act.id,
    stravaExternalId: act.external_id,
    title: act.name,
    distance: act.distance,
    movingTime: act.moving_time,
    elapsedTime: act.elapsed_time,
    stravaType: act.type,
    startDate: stravaDateFormatter(act.start_date),
    bikeId: act.gear_id,
    description: act.description,
  }));

export const convertStravaBike = (bike) => ({
  id: bike.id,
  strava: true,
  name: bike.name,
  distance: bike.distance,
  brand: bike.brand_name,
  model: bike.model_name,
  type: `${bike.frame_type}`,
  description: bike.description,
  retired: false,
  frameWeight: '',
});
