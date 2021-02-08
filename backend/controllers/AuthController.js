const authService = require('../Services/AuthService');
const User = require('../models/User');

module.exports = {

  register: async (req, res) => {
    try {
      const userData = await authService.register(req.body);
      const { username, userSub, email } = userData;
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
        createdAt: createdUser.createdAt.toISOString(),
        updatedAt: createdUser.updatedAt.toISOString(),
      });
  } catch (err) {
      res.send(err)
  }

},

  confirmRegister: async (req, res) => {
    try {
      const confirm = await authService.confirmRegister(req.body);
      if(confirm.result === 'SUCCESS'){
        const updatedUser = await User.updateOne({ username: confirm.username }, {emailVerified: true});
        res.send({
          status: confirm.result,
          DB: updatedUser.nModified,
        })
      }
    } catch (error) {
      res.send(error)
    }
  },

  login: function(req, res){
    authService.login(req.body)
    .then((token) => {
      res.send(token)
    })
    .catch((error) => {
      res.send(error)
    })
  },

  validate_token: function(req, res){
    authService.Validate(req.body.token,function(err, result){
      if(err){
        res.send(err);
      }    
      res.send(result);
    })
  }

}