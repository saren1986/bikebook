const authService = require('../Services/AuthService');
const User = require('../models/User');

module.exports = {
  register: async (req, res) => {
    try {
      const userData = await authService.register(req.body);
      const { username, userSub, email, cognitoUser } = userData;
      const user = new User({
        _id: userSub,
        username,
        cognitoUserSub: userSub,
        email,
        emailVerified: false,
      });
      const createdUser = await user.save();
      res.send({
        ...createdUser._doc,
        cognitoUser,
        createdAt: createdUser.createdAt.toISOString(),
        updatedAt: createdUser.updatedAt.toISOString(),
      });
    } catch (err) {
      return res.status(400).send({
        message: err.message,
      });
    }
  },
  confirmRegister: async (req, res) => {
    try {
      const confirm = await authService.confirmRegister(req.body);
      if (confirm.result === 'SUCCESS') {
        const updatedUser = await User.updateOne(
          { username: confirm.username },
          { emailVerified: true }
        );
        res.send({
          status: confirm.result,
          DB: updatedUser.nModified,
          message: 'The account has been created and confirmed',
        });
      }
    } catch (err) {
      return res.status(400).send({
        message: err.message,
      });
    }
  },
};
