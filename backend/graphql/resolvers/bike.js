const Bike = require('../../models/Bike');
const { checkAuth } = require('../../utils/auth');

module.exports = {

  bikes: async (args, req) => {
    const { strava } = args;
    checkAuth(req.user);
    const bikes = await Bike.find({ user: req.user.id })
    .populate('user')
    .populate('type');
    if (!bikes) {
      throwError('No bikes found!', 404);
    }
    return bikes
      .filter((bike) => {
        if (strava === 0 && bike.stravaSync) { // all non strava bikes and sync strava bikes
          return true;
        }else if(strava === 1 && bike.stravaId && !bike.stravaSync){// only non sync strava bikes
          return true;
        }else if(strava === 2){ // all bikes
          return true;
        }
      })
      .map((bike) => ({
        ...bike._doc,
        id: bike._doc._id,
        createdAt: bike.createdAt.toISOString(),
        updatedAt: bike.updatedAt.toISOString(),
      }));
  },
  createBike: async (args, req) => {
    checkAuth(req.user);
    const { name, distance, brand, model, description, weight, type } = args.data;
    const bike = new Bike({
      name, 
      distance, 
      brand, 
      model, 
      description, 
      weight,
      stravaId: false,
      retired: false, 
      user: req.user.id,
      type,
    });
    const createdBike = await bike.save();
    return {
      ...createdBike._doc,
      id: createdBike._doc._id,
      createdAt: createdBike.createdAt.toISOString(),
      updatedAt: createdBike.updatedAt.toISOString(),
    };
  },

  
};