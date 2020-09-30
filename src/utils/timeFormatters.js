export const stravaDateFormatter = (date) => date.replace('T', ' ').replace('Z', ' ');
export const timeFormatter = (stringDate) => stringDate.substring(0, 16).replace('T', ' ');
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
export const timeToSeconds = (time) => {
  const h = time.substring(0, time.indexOf(':'));
  const m = time.substring(time.indexOf(':') + 1);
  return +h * 3600 + +m * 60;
};
export const secondsToTime = (s) => {
  const h = Math.floor(s / 60 / 60);
  const m = Math.floor(s / 60) - (h * 60);
  return `${h > 9 ? h : `0${h}`}:${m > 9 ? m : `0${m}`}`;
};
