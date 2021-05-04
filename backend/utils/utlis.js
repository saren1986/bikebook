const hasTimePassed = (dateInISOString, timeInHours = 24) => {
  const currentDate = new Date().getTime();
  const providedDate = new Date(dateInISOString).getTime();
  if( (currentDate - providedDate) / 1000 / 60 / 60 > timeInHours){
    return true;
  }else
  return false;
}

module.exports = {
  hasTimePassed
};