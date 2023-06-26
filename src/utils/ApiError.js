class ApiError extends Error {
  constructor(statusCode, message, stack) {
    super(message);
    this.statusCode = statusCode;
    this.stack = stack;
  }
}

export default ApiError;
