const throwError = (code, message) => {
    const error = new Error(message);
    error.code = code; 
    throw error; 
}
const nextError = (code, message, next) => {
  const error = new Error(message);
  error.code = code;
  next(error);
  //TODO: MIDDLAWERE FOR THAT
}

module.exports = {
  throwError,
  nextError,
}