import {
  CognitoUserPool,
  // CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

const getCognitoUser = () => userPool.getCurrentUser();

const checkSession = () => new Promise((resolve, reject) => {
  const cognitoUser = getCognitoUser();
  if (!cognitoUser) {
    resolve(null);
  }
  cognitoUser.getSession((err, session) => {
    if (err) {
      reject(err);
    }
    const { payload: { exp, sub, username }, jwtToken, refreshToken } = session.accessToken;
    resolve({
      userId: sub,
      username,
      exp,
      accessToken: jwtToken,
      cognitoUser,
      refreshToken,
    });
  });
});

export default {
  signIn: ({ username, password }) => new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const userDetails = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userDetails);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(result) {
        const session = result.getAccessToken();
        const sessionDetails = {
          userId: session.payload.sub,
          username: session.payload.username,
          exp: session.payload.exp,
          accessToken: session.jwtToken,
        };
        resolve(sessionDetails);
      },
      onFailure(err) {
        reject(err);
      },
    });
  }),

  signOut: () => new Promise((resolve, reject) => {
    checkSession().then((sessionDetails) => {
      if (!sessionDetails.cognitoUser) reject(new Error('There is no cognito user'));
      sessionDetails.cognitoUser.globalSignOut({
        onSuccess(res) {
          resolve({ status: res });
        },
        onFailure(err) {
          reject(err);
        },
      });
    }).catch((err) => {
      reject(err);
    });
  }),

  getSession: () => new Promise((resolve, reject) => {
    checkSession().then((sessionDetails) => {
      resolve(sessionDetails);
    }).catch((err) => {
      reject(err);
    });
  }),

};
