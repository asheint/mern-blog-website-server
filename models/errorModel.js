class HttpError extends Error {
  constructor(message, errorCode) {
    this.code = errorCode;
  }
}

module.exports = HttpError;
