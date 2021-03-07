const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  cognitoUserSub: {
    type: String,
    unique: true,
    required: true,
  }, //TODO: DELETE
  email: { type: String, unique: true,  required: true },
  emailVerified: { type: Boolean,  required: true },

  stravaId: { type: Number },
  stravaAccessToken: { type: String },
  stravaRefresToken: { type: String },
  stravaExpiresAt: { type: Number },
  stravaExpiresIn: { type: Number },
  stravaAthlete: { type: Object },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
