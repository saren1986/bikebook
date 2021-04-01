const stravaAPI = require('strava-v3');

module.exports = {
  auth: (code) => {
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
          if (data.errors) {
            reject({
              message: data.message,
              errors: data.errors
            })
          } else {
            resolve(data);
          }

        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  refreshToken: (refreshToken) => {
    const queryData = {
      client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
      client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    };
    return new Promise((resolve, reject) => {
      fetch('https://www.strava.com/api/v3/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(queryData)
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.errors) {
            reject({
              message: data.message,
              errors: data.errors
            })
          } else {
            resolve(data);
          }

        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  fetchBike: (bikeId, token) => {
    const strava = new stravaAPI.client(token);
    return new Promise((resolve, reject) => {
      strava.gear.get({
        id: bikeId
      }, function (err, payload) {
        if (err) {
          reject(err);
        }
        resolve(payload);
      })
    })

  },
  fetchAthlete: (token) => {
    const strava = new stravaAPI.client(token);
    return new Promise((resolve, reject) => {
      strava.athlete.get({}, (err, payload) => {
        if (err) {
          reject(err);
        }
        resolve(payload);
      });
    });
  },
  fetchActivities: (token, params) => {
    const {
      before,
      after,
      page,
      per_page
    } = params;
    const strava = new stravaAPI.client(token);
    return new Promise((resolve, reject) => {
      strava.athlete.listActivities({
        page,
        per_page
      }, (err, payload) => {
        if (err) {
          reject(err);
        }
        resolve(payload);
      });
    });
  }
};