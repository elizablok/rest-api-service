import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config';
import db from '../models';
import tokenTypes from '../config/tokens';

const { Token } = db.models;

const generateOne = (type, sub, expTime) => {
  const payload = {
    type,
    sub,
    iat: moment().unix(),
    exp: expTime.unix(),
  };
  return jwt.sign(payload, config.jwt.secret);
};

const save = async (token, type, userId, expires, blacklisted = false) => {
  const savedToken = await Token.create({
    token,
    type,
    userId,
    expires: expires.toDate(),
    blacklisted,
  });
  return savedToken;
};

const verify = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const verifiedToken = await Token.findOne({
    token,
    type,
    userId: payload.sub,
    blacklisted: false,
  });
  if (!verifiedToken) {
    throw new Error('Token not found');
  }
  return verifiedToken;
};

const generateAuth = async (userId) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes'
  );
  const accessToken = generateOne(
    tokenTypes.ACCESS,
    userId,
    accessTokenExpires
  );
  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    'days'
  );
  const refreshToken = generateOne(
    tokenTypes.REFRESH,
    userId,
    refreshTokenExpires
  );

  await save(refreshToken, tokenTypes.REFRESH, userId);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

export default {
  generateOne,
  save,
  verify,
  generateAuth,
};
