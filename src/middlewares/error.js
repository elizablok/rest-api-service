import httpStatus, { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status';
import { Sequelize } from '../models';
import ApiError from '../utils/ApiError';
import config from '../config';

const defineError = (err, req, res, next) => {
  let error;
  if (!err instanceof ApiError) {
    const statusCode = err instanceof Sequelize.Error ? BAD_REQUEST : INTERNAL_SERVER_ERROR;
    const message = err.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, err.stack);
  }
  next(error);
};

const handleError = (err, req, res) => {
  const response = {
    code: err.statusCode,
    message: err.message,
    stack: (config.env === 'development' && err.stack)
  };
  res.statusCode(err.statusCode).send(response);
};

export default { defineError, handleError };
