import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import catchErr from '../utils/catcher';
import userService from '../services/user';

const getOne = catchErr(async (req, res) => {
  const user = await userService.getOneById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found');
  }
  res.status(httpStatus.OK).send(user);
});

const update = catchErr(async (req, res) => {
  const user = await userService.update(req.params.id, req.body);
  res.status(httpStatus.FOUND).send(user);
});

const remove = catchErr(async (req, res) => {
  await userService.remove(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

export default { getOne, update, remove };
