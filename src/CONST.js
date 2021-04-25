const STRAVA_REDIRECT_URI = 'http://localhost:3000/strava-sync';
const STRAVA_PERMISSION_SCOPES = 'read,read_all,profile:read_all,activity:read_all';
// eslint-disable-next-line import/prefer-default-export
export const STRAVA_SYNC_URL = `http://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${STRAVA_REDIRECT_URI}&approval_prompt=force&scope=${STRAVA_PERMISSION_SCOPES}`;
