const mongoose = require('mongoose');

const bikeTypeSchema = new mongoose.Schema({
  type: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const BikeType = mongoose.model('BikeType', bikeTypeSchema);

module.exports = BikeType;