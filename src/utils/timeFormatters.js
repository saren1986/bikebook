export const stravaDateFormatter = (date) => date.replace('T', ' ').replace('Z', ' ');
export const deleteTimeFormJsonDate = (date) => date.substr(0, date.indexOf('T'));
export const secondsToHours = (time) => {
  const h = Math.floor(time / 60 / 60);
  const m = Math.floor(time / 60) - (h * 60);
  const s = time % 60;
  if (h > 0) {
    return `${h}h ${m}m`;
  }
  return `${m}m ${s}s`;
};
