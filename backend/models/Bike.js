const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
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
    required: false,
  },
  startDate: {
    type: String,
    required: false,
  },
  stravaId: {
    type: String,
    required: true,
  },
  stravaSync: {
    type: Boolean,
  },
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;