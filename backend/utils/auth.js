const isTokenExpired = (expiresAt) => {
  const expirationTime = expiresAt * 1000;
  const currentTime = new Date().getTime();
  if (expirationTime - currentTime > 0) {
    return false;
  }
  return true;
}
const checkAuth = (user) => {
  if (!user) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  }
};

module.exports = {
  isTokenExpired,
  checkAuth,
};