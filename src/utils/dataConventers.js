export const convertStravaActivities = (activities) => activities
  .map((act) => ({
    id: act.id,
    strava: !!act.id,
    stravaExternalId: act.external_id,
    title: act.name,
    distance: act.distance,
    movingTime: act.moving_time,
    elapsedTime: act.elapsed_time,
    stravaType: act.type,
    startDate: act.start_date,
    bikeId: act.gear_id,
    description: act.description,
  }));

export const convertStravaBike = (bike) => ({
  strava: bike.id,
  name: bike.name || '',
  distance: bike.distance || 0,
  brand: bike.brand_name || '',
  model: bike.model_name || '',
  type: `${bike.frame_type}`,
  description: bike.description || '',
  retired: false,
  weight: 0,
});
