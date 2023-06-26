import db from '../models';

const { File } = db.models;

const getOne = async (id) => {
  return File.findOne({ where: { id } });
};

const getList = async (listSize, page) => {
  const filesNumber = await File.count();
  const pagesNumber = filesNumber / listSize;
  const offset = (pagesNumber * page) - listSize;
  return File.findAll({
    order: db.sequelize.literal('created_at ASC'),
    limit: listSize,
    offset,
  });
};

const download = async (id) => {
  const file = await getOne(id);
  return { filePath: file.path, fileName: file.name };
};

const update = async (id, body, userId) => {
  return File.update(body, { where: { id, userId } });
};

const remove = async (id, userId) => {
  return File.destroy({ where: { id, userId } });
};

const upload = async (body, userId) => {
  return File.create({ userId, ...body });
};

export default { getOne, getList, download, update, remove, upload };
