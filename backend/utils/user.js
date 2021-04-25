const User = require('../models/User');

const getUser = async (userId, res) => {
  try {
    const user = await User.findOne({_id: userId});
    if (!user) {
      res.send(401, {
        message: `User not found`,
      });
      return false;
    }
    return user;
  } catch (error) {
    res.send(500, {
      message: error.message || JSON.stringify(error),
    });
    return false;
  }
}
const getUserByStravaId = async (stravaId, res) => {
  try {
    const user = await User.findOne({stravaId});
    if (!user) {
      res.send(401, {
        message: `User not found`,
      });
      return false;
    }
    return user;
  } catch (error) {
    res.send(500, {
      message: error.message || JSON.stringify(error),
    });
    return false;
  }
}

module.exports = {
  getUser,
  getUserByStravaId,
};