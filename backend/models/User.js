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
  },
  email: { type: String, unique: true },
  emailVerified: { type: Boolean },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
