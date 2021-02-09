require('cross-fetch/polyfill');

const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.AWS_COGNITO_CLIENT_ID,
});

module.exports = {
  register: (body) => {
    const username = body.username;
    const password = body.password;
    const email = body.email;
    const dataEmail = {
      Name: 'email',
      Value: email,
    };
    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    const attributeList = [];
    attributeList.push(attributeEmail);
    return new Promise((resolve, reject) => {
      userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        const userData = {
          email, 
          username: result.user.username,
          userSub: result.userSub,
        }
        resolve(userData)
      });
    }); 
  },

  confirmRegister: (body) => {
    const username = body.username;
    const verificationCode = body.code;
    const  userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({
          result,
          username,
        })
      });
    });
  },

  resendConfirmationCode: (username) => {
    const  userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    return new Promise((resolve, reject) => {
    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        reject(err);
        return;
      }
      resolve(result)
    });
    });
  },

  login: (body) => {
    const userName = body.name;
    const password = body.password;
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
         Username: userName,
         Password: password
     });
     const userData = {
         Username: userName,
         Pool: userPool
     };
     const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
     return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
           const accesstoken = result.getAccessToken().getJwtToken();  
           resolve(accesstoken)   
        },
        onFailure: (function (err) {
          reject(err);
       }),
      });
    });
  },

  checkAuth: (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token){
      res.status(401);
      return res.send({
        message: "Not authorized"
      });
    }
    fetch(`https://cognito-idp.${process.env.AWS_COGNITO_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`)
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then(data => {
        pems = {};
        data.keys.forEach((key) => {
          const key_id = key.kid;
          const modulus = key.n;
          const exponent = key.e;
          const key_type = key.kty;
          const jwk = { kty: key_type, n: modulus, e: exponent};
          const pem = jwkToPem(jwk);
          pems[key_id] = pem;
        });
        const decodedJwt = jwt.decode(token, {complete: true});
        if (!decodedJwt) {
          res.status(401);
          return res.send({
            message: "Invalid token"
          });
        }
          const kid = decodedJwt.header.kid;
          const pem = pems[kid];
          if (!pem) {
            res.status(401);
            return res.send({
              message: "Invalid token"
            });
          }
          jwt.verify(token, pem, { algorithms: ['RS256'] }, function(err, decodedToken) {
            if(err) {
              res.status(401);
              return res.send(err);
            } else {
              req.user = {
                id: decodedToken.sub,
                cognitoUserSub: decodedToken.sub,
                username: decodedToken.username,
              };
              return next();
            }
          });
      })
      .catch((err) => {
        res.status(500);
        return res.send(`Error! Unable to download JWKs. Error: ${err}`);
      });
  },

}









