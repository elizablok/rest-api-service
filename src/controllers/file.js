import httpStatus from 'http-status';
import fileService from '../services/file';
import catchErr from '../utils/catcher';

const getOne = catchErr(async (req, res) => {
  const file = await fileService.getOne(req.params.id);
  res.status(httpStatus.OK).send(file);
});

const getList = catchErr(async (req, res) => {
  const { listSize, page } = req.params;
  const files = await fileService.getList(listSize, page);
  res.status(httpStatus.OK).send(files);
});

const download = catchErr(async (req, res) => {
  const { filePath, fileName } = await fileService.download(req.params.id);
  res.download(filePath, fileName, (err) => {
    if (err) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send('Sorry, we were unable to download the file.');
    }
    res.status(httpStatus.OK).send();
  });
});

const update = catchErr(async (req, res) => {
  const { id, body } = req.params;
  const updatedFile = await fileService.update(id, body, req.user.id);
  res.status(httpStatus.FOUND).send(updatedFile);
});

const remove = catchErr(async (req, res) => {
  await fileService.remove(req.params.id, req.user.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const upload = catchErr(async (req, res) => {
  const uploadedFile = await fileService.upload(req.params.body, req.user.id);
  res.status(httpStatus.FOUND).send(uploadedFile);
});

export default { getOne, getList, download, update, remove, upload };
