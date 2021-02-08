const Bike = require('./bike');
const BikeType = require('./bikeType');

module.exports = {
  ...Bike,
  ...BikeType,
};