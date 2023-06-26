import httpStatus from 'http-status';
import authService from '../services/auth';
import tokenService from '../services/token';
import userService from '../services/user';
import catchErr from '../utils/catcher';

const register = catchErr(async (req, res) => {
  const user = await userService.create(req.body);
  const tokens = await tokenService.generateAuth(user.id);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchErr(async (req, res) => {
  const { name, password } = req.body;
  const user = await authService.login(name, password);
  const tokens = await tokenService.generateAuth(user.id);
  res.status(httpStatus.FOUND).send({ user, tokens });
});

const logout = catchErr(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchErr(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.status(httpStatus.CREATED).send({ ...tokens });
});

export default { register, login, logout, refreshTokens };
