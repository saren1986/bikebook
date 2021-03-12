const strava = require('../services/Strava');
const User = require('../models/User');
const Bike = require('../models/Bike');
const BikeType = require('../models/BikeType');
const {
  checkAuth,
  isTokenExpired
} = require('../utils/auth');


const checkAndRefreshToken = async (refreshToken, expiresAt) => {
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
    console.log('error in checkAndRefreshToken', error); //TODO: error handler
  }
}

const updateUserTokens = async (user, tokens) => {
  user.stravaAccessToken = tokens.stravaAccessToken;
  user.stravaRefresToken = tokens.stravaRefresToken;
  user.stravaExpiresAt = tokens.stravaExpiresAt;
  user.stravaExpiresIn = tokens.stravaExpiresIn;
  return await user.save();
}

const fetchBikes = async (req, res) => {
  checkAuth(req.user);
  try {
    const user = await User.findOne({
      _id: req.user.id
    });
    if (!user) {
      res.status(400);
      return res.send({
        message: 'No user found', //TODO: Handling error
      });
    }

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
    console.log('fetchBikes error', error); //TODO: Handling error
  }
};
const sync = async (req, res) => {
  checkAuth(req.user);
  try {
    const response = await strava.auth(req.body.code);
    const {
      expires_at,
      expires_in,
      refresh_token,
      access_token,
      athlete
    } = response;
    const user = await User.findOne({
      _id: req.user.id
    });
    if (!user) {
      res.status(400);
      return res.send({
        message: 'No user found' //TODO: Handling error
      });
    }
    user.stravaId = athlete ? athlete.id : null;
    user.stravaAccessToken = access_token;
    user.stravaRefresToken = refresh_token;
    user.stravaExpiresAt = expires_at;
    user.stravaExpiresIn = expires_in;
    user.stravaAthlete = athlete;

    const athleteMore = await strava.fetchAthlete(access_token);
    const updatedUser = await user.save();
    const userBikes = await Bike.find({
      user: req.user.id
    }); //get user's current bike from database to compare with those fetch from strava
    let updatedBike = null;

    if (athleteMore && athleteMore.bikes) {
      const bikesDraft = athleteMore.bikes
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
    });
  } catch (err) {
    res.status(401);
    return res.send({
      message: err.message,
      errors: err.errors
    });
  }
};
const devtest = () => {
}; //TODO: DELETE

module.exports = {
  sync,
  fetchBikes,
  devtest, //TODO: delete
}