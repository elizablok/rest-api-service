import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';
import config from './index';
import tokenTypes from './tokens';

const options = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const verify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.access) {
      throw new Error('Invalid token type');
    }
    const user = await User.findOne({ where: { id: payload.sub } });
    if (!user) {
      done(null, false);
    }
    done(null, user, { message: 'User not found' });
  } catch (err) {
    done(err, false);
  }
};

export default new Strategy(options, verify);
