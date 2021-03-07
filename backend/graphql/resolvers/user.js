const User = require('../../models/User');
const { checkAuth } = require('../../utils/auth');

module.exports = {
  user: async (args, req) => {
    checkAuth(req.user);
    const user = await User.findOne({ _id: req.user.id });
      console.log('user', user);
      if(!user){
      res.status(400);
      return res.send({
        message: 'No user found'
      });
      }
    return {
      ...user._doc,
      id: user._doc._id,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  },
};