const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  movingTime: {
    type: Number,
    required: true,
  },
  elapsedTime: {
    type: Number,
  },
  startDate: {
    type: String,
    required: true,
  },
  utcOffset: {
    type: Number,
  },
  bikeId: {
    type: String,
    ref: 'Bike',
    required: true,
  },
  stravaId: {
    type: String,
    unique: true,
    index: true,
    sparse: true,
  },
  stravaType: {
    type: String,
  },
  components: [String],
  user: {
    type: String,
    ref: 'User',
    required: true,
    index: true,
  },
}, { timestamps: true });

const Bike = mongoose.model('Activity', activitySchema);

module.exports = Bike;