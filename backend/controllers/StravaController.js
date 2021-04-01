const strava = require('../services/Strava');
const Bike = require('../models/Bike');
const BikeType = require('../models/BikeType');
const Activity = require('../models/Activity');
const {
  checkAuth,
  isTokenExpired
} = require('../utils/auth');
const {
  getStravaIdBikeIdPairs,
  convertStravaActivities,
  filterActivities,
} = require('../utils/strava');
const {
  getUser
} = require('../utils/user.js');
const {
  throwError,
  nextError
} = require('../utils/errorHandler');
const { hasTimePassed } = require('../utils/utlis');


const checkAndRefreshToken = async (refreshToken, expiresAt) => {
  if (!refreshToken || !expiresAt) {
    throwError(500, 'Strava refresh token or expiresAt not found');
  }
  try {
    if (expiresAt && !isTokenExpired(expiresAt)) {
      return false;
    }
    const {
      expires_at,
      expires_in,
      refresh_token,
      access_token
    } = await strava.refreshToken(refreshToken);
    return {
      stravaAccessToken: access_token,
      stravaRefresToken: refresh_token,
      stravaExpiresAt: expires_at,
      stravaExpiresIn: expires_in,
    }
  } catch (error) {
    const errMessage = error.message ? `Strava checkAndRefreshToken: ${error.message}` : JSON.stringify(error);
    throwError(500, errMessage);
  }
}

const updateUserTokens = async (user, tokens) => {
  user.stravaAccessToken = tokens.stravaAccessToken;
  user.stravaRefresToken = tokens.stravaRefresToken;
  user.stravaExpiresAt = tokens.stravaExpiresAt;
  user.stravaExpiresIn = tokens.stravaExpiresIn;
  try {
    return await user.save()
  } catch (_) {
    //TODO: make log for that
  }
}

const fetchBikes = async (req, res) => {
  checkAuth(req.user);
  try {
    const user = await getUser(req.user.id, res);
    if (!user) return false;

    //checking if token is still valid, if not, refresh token and save it to db
    const newTokens = await checkAndRefreshToken(user.stravaRefresToken, user.stravaExpiresAt);
    let token = user.stravaAccessToken;
    if (newTokens) {
      token = newTokens.stravaAccessToken;
      await updateUserTokens(user, newTokens);
    }

    const bikesToFetch = req.body.bikes;
    const bikePromises = bikesToFetch.map((bike) => strava.fetchBike(bike, token));
    const stravaBikes = await Promise.all(bikePromises);
    const bikeTypes = await BikeType.find({});

    const updatedBikeResults = [];
    for (const stravaBike of stravaBikes) {
      const {
        name,
        distance,
        brand_name,
        model_name,
        frame_type,
        description,
        id
      } = stravaBike;
      const type = bikeTypes.find(({
        type
      }) => type === frame_type);
      const bikeToUpdate = await Bike.findOne({
        user: req.user.id,
        stravaId: id
      });
      if (bikeToUpdate) {
        bikeToUpdate.name = name;
        bikeToUpdate.distance = distance;
        bikeToUpdate.description = description;
        bikeToUpdate.model = model_name;
        bikeToUpdate.brand = brand_name;
        bikeToUpdate.type = type || null;
        bikeToUpdate.stravaSync = true;
      }
      const updatedUserBike = await bikeToUpdate.save();
      updatedBikeResults.push(updatedUserBike);
    }
    res.send({
      bikes: updatedBikeResults.map((bike) => ({
        ...bike._doc,
        id: bike._doc._id,
        createdAt: bike.createdAt.toISOString(),
        updatedAt: bike.updatedAt.toISOString(),
      }))
    });

  } catch (error) {
    throwError(500, error.message || JSON.stringify(error));
  }
};
const fetchActivities = async (user, all = false, bikes) => {
  //checking if token is still valid, if not, refresh token and save it to db
  try {
    const newTokens = await checkAndRefreshToken(user.stravaRefresToken, user.stravaExpiresAt);
    let token = user.stravaAccessToken;
    if (newTokens) {
      token = newTokens.stravaAccessToken;
      await updateUserTokens(user, newTokens);
    }
    const resultActivities = [];
    let isFetching = all;
    let pageCounter = 1;
    const perPage = all ? 200 : 100; //TODO: SET TO 100
    do {
      // console.log('fetching loop page: ', pageCounter);
      const newActivities = await strava.fetchActivities(token, {
        page: pageCounter,
        per_page: perPage
      })
      if (newActivities.length) {
        pageCounter += 1;
        resultActivities.push(...newActivities);
      } else {
        isFetching = false;
      }
    } while (isFetching);

    if (resultActivities.length > 1) {
      const userBikes = bikes || await Bike.find({
        user: user.id,
      });
      const bikeIdStravaId = getStravaIdBikeIdPairs(userBikes);
      return convertStravaActivities(resultActivities, user.id, bikeIdStravaId);
    }
    return false;
  } catch (error) {
    throwError(500, error.message || JSON.stringify(error));
  }
}

const sync = async (req, res) => {
  checkAuth(req.user);
  const syncErrors = [];
  try {
    const response = await strava.auth(req.body.code);
    const {
      expires_at,
      expires_in,
      refresh_token,
      access_token,
      athlete
    } = response;

    const user = await getUser(req.user.id, res);
    if (!user) return false;

    // if (user.stravaId) { //TODO: uncomment if build special function for updates
    //   syncErrors.push({status: 'failed', message: 'Accont is already sync with Strava.'});
    //   return res.send({errors: syncErrors})
    // }
    if (user.stravaId && user.lastStravaSync && !hasTimePassed(user.lastStravaSync)) {
      syncErrors.push({status: 'failed', message: 'You can only synchronize your Strava account one a day.'});
      return res.send({errors: syncErrors})
    } 

    user.stravaId = athlete ? athlete.id : null;
    user.stravaAccessToken = access_token;
    user.stravaRefresToken = refresh_token;
    user.stravaExpiresAt = expires_at;
    user.stravaExpiresIn = expires_in;
    user.stravaAthlete = athlete;
    user.lastStravaSync = null;
    let updatedUser = await user.save();

    const athleteDetails = await strava.fetchAthlete(access_token);
    const userBikes = await Bike.find({
      user: req.user.id
    }); //get user's current bike from database to compare with those fetch from strava
    let updatedBike = [];

    if (athleteDetails && athleteDetails.bikes) {
      const bikesDraft = athleteDetails.bikes
        .filter((b) => userBikes.findIndex((userBike) => userBike.stravaId === b.id) === -1) //filter bike from strava already exists in db
        .map((b) => {
          return {
            name: b.name,
            distance: b.distance,
            brand: null,
            model: null,
            description: null,
            weight: null,
            retired: false,
            user: req.user.id,
            type: null,
            stravaSync: false,
            stravaId: b.id,
          }
        });
      updatedBike = await Bike.insertMany(bikesDraft);
    }
    const stravaActivities = await fetchActivities(user, false) //TODO: set to true if download all
      .catch((err) => {
        syncErrors.push({
          status: 'activities sync failed',
          message: err.message || JSON.stringify(err)
        });
      })
    if (stravaActivities) {
      const userActivities = await Activity.find({
        user: req.user.id, stravaId: { $ne: null }
      });
      const filteredSavedActivities = filterActivities(stravaActivities, userActivities);
      await Activity.insertMany(filteredSavedActivities)
        .catch((err) => {
          syncErrors.push({
            status: 'activities sync failed',
            message: err.message || JSON.stringify(err)
          });
        })
    }
    if(!syncErrors.length) {
      user.lastStravaSync = new Date().toISOString();
      updatedUser = await user.save();
    }
    res.send({
      stravaId: updatedUser.stravaId,
      stravaAuth: {
        stravaAccessToken: updatedUser.stravaAccessToken,
        stravaRefresToken: updatedUser.stravaRefresToken,
        stravaExpiresAt: updatedUser.stravaExpiresAt,
        stravaExpiresIn: updatedUser.stravaExpiresIn,
        stravaId: updatedUser.stravaId,
      },
      stravaAthlete: updatedUser.stravaAthlete,
      bikesDraft: updatedBike.map((b) => {
        return {
          ...b._doc,
          id: b._doc._id,
          createdAt: b.createdAt.toISOString(),
          updatedAt: b.updatedAt.toISOString(),
        }
      }),
      errors: syncErrors,
    });
  } catch (err) {
    console.log('err', err);
    return res.send({
      message: err.message,
    });
  };
}

const devtest = async (req, res, next) => {

  const user = await getUser('31905871-4a29-4b05-b9c3-c72ff0b5773e', res);
  if (!user) return false;
  try {
    const response = await fetchActivities(user, false);
    res.send(response);
  } catch (error) {
    res.status(500);
    return res.send({
      message: error.message,
      errors: error.errors
    });
  }

}; //TODO: DELETE

//TODO: REVOKE STRAVA ACCESS
module.exports = {
  sync,
  fetchBikes,
  devtest, //TODO: delete
}