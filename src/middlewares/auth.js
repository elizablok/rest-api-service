import passport from 'passport';
import { UNAUTHORIZED } from 'http-status';
import ApiError from '../utils/ApiError';

const verify = (req, resolve, reject) => (err, user, info) => {
  if (err || !user) {
    reject(
      new ApiError(
        UNAUTHORIZED,
        `${info ? `${info.message}. ` : ''} Please, authenticate`
      )
    );
  }
  req.user = user;
  resolve();
};

export default () => (req, res, next) =>
  new Promise((resolve, reject) =>
    passport.authenticate(
      'jwt',
      { session: false },
      verify(req, resolve, reject)
    )(req, res, next)
  )
    .then(() => next())
    .catch((err) => next(err));
