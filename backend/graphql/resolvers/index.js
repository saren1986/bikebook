const Bike = require('./bike');
const BikeType = require('./bikeType');
const User = require('./user');

module.exports = {
  ...Bike,
  ...BikeType,
  ...User,
};