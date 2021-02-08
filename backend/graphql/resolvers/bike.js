const Bike = require('../../models/Bike');
const { checkAuth } = require('../../utils/auth');

module.exports = {

  bikes: async (args, req) => {
    checkAuth(req.user);
    const bikes = await Bike.find({ user: req.user.id })
    .populate('user')
    .populate('type');
    if (!bikes) {
      throwError('No bikes found!', 404);
    }
    return bikes.map((bike) => ({
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
      strava: false,
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