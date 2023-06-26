import httpStatus from 'http-status';
import db from '../models';
import ApiError from '../utils/ApiError';

const { User } = db.models;

const getOneByName = async (name) => User.findOne({ name });

const getOneById = async (id) => User.findOne({ id });

const create = async (body) => {
  if (User.isNameTaken(body.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }
  return User.create(body);
};

const update = async (id, body) => {
  const updatedUser = User.update(body, { where: { id } });
  if (!updatedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (User.isNameTaken(body.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }
  return updatedUser;
};

const remove = async (id) => {
  const deletedUser = User.destroy({ where: { id } });
  if (!deletedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return deletedUser;
};

export default {
  getOneById,
  getOneByName,
  create,
  update,
  remove,
};
