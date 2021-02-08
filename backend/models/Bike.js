const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  strava: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: false,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BikeType',
    required: true,
  },
  model: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  retired: {
    type: Boolean,
    required: false,
  },
  weight: {
    type: Number,
    required: true,
  },
  startDate: {
    type: String,
    required: false,
  },
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;