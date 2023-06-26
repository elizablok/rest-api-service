import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { tokenService, userService } from './index';
import db from '../models';
import tokenTypes from '../config/tokens';

const { Token } = db.models;

const login = async (name, password) => {
  const user = await userService.getOneByName(name);
  if (!user || !user.passwordMatches(password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect name or password');
  }
  return user;
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    where: { token: refreshToken, type: tokenTypes, blacklisted: false },
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.destroy();
};

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verify(refreshToken);
    refreshTokenDoc.destroy();
    return tokenService.generateAuth(refreshTokenDoc.user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please, authorize');
  }
};

export default { login, logout, refreshAuth };
