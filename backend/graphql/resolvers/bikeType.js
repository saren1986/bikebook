const BikeType = require('../../models/BikeType');

module.exports = {

  bikeTypes: async (args, req) => {
    checkAuth(req.user);
    const bikeTypes = await BikeType.find({});
    if (!bikeTypes) {
      throwError('No bike types found!', 404);
    }
    return bikeTypes.map((bikeType) => ({
      ...bikeType._doc,
      id: bikeType._doc._id,
      createdAt: bikeType.createdAt.toISOString(),
      updatedAt: bikeType.updatedAt.toISOString(),
    }));
  },
  createBikeType: async (args, req) => {
    //TODO: only for admin
    checkAuth(req.user);
    const { type, label } = args.data;
    const bikeType = new BikeType({
      type,
      label,
    });
    const createdBikeType = await bikeType.save();
    return {
      ...createdBikeType._doc,
      id: createdBikeType._doc._id,
      createdAt: createdBikeType.createdAt.toISOString(),
      updatedAt: createdBikeType.updatedAt.toISOString(),
    };
  },
};