
const stravaAPI = require('strava-v3');

const fetchAthlete = async (strava) => strava.athlete.get({});
const fetchActivities = async (strava) => strava.athlete.listActivities({
  after: 1336756835,
  // per_page: 300,
  // page: 10,

  // TODO:  Get Athlete Stats (getStats)
});

const fetchBike = async (strava, id) => strava.gear.get({ id });

module.exports = {
  auth: (code) =>  {
    const queryData = {
      client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
      client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
    };
    return new Promise((resolve, reject) => {
      fetch("https://www.strava.com/oauth/token", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(queryData)
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if(data.errors){
          reject({message: data.message, errors: data.errors })
        }else{
          resolve(data);
        }
       
      })
      .catch((err) => {
        reject(err)
      });
    });
  },
  fetchBike: (bikeId, token) => {
    console.log('>>>>!!!', bikeId);
    const strava = new stravaAPI.client(token);
    return new Promise((resolve, reject) => {
      strava.gear.get({ id: bikeId }, function(err,payload,limits) {
        console.log('fetchBikes', payload, limits);
       if(err){
         console.log('fetchBikes err', err);
         reject(err);
       }
       resolve(payload);
    })
    })
    
  },
  fetchAthlete: async (token) => {
    const strava = new stravaAPI.client(token);
    try {
      return strava.athlete.get({});
    } catch (error) {
      return error
    }
  }
};
