const getStravaIdBikeIdPairs = (bikes) => bikes
.filter((bike) => bike.stravaId)
.reduce((acc, bike) => {
  return {
    ...acc,
    [bike.stravaId]: bike._id
  }
}, {});

const convertStravaActivities = (activities, user, bikeIdPairs) => activities
.filter((act) => act.type === 'Ride')
.map((act) => ({
  title: act.name,
  distance: act.distance,
  movingTime: act.moving_time,
  elapsedTime: act.elapsed_time,
  startDate: act.start_date,
  utcOffset: act.utc_offset,
  bikeId: bikeIdPairs[act.gear_id] || null,
  stravaId: `${act.id}`,
  stravaType: act.type,
  components: [],
  user,
  }));

  const filterActivities = (stravaActivities, userActivities) => 
     stravaActivities
     .filter((stravaActivity) => !userActivities
      .find((userActivity) => userActivity.stravaId === stravaActivity.stravaId));
  
  module.exports = {
    convertStravaActivities,
    getStravaIdBikeIdPairs,
    filterActivities
  }