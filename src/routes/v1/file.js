import express from 'express';
import controller from '../../controllers/file';

const router = express.Router();

router
  .route('/:id')
  .get(auth(), validate(), controller.get)
  .delete(auth(), validate(), controller.delete)
  .put(auth(), validate(), controller.update);

router.get('/download/:id', validate(), controller.download);
router.get('/list', auth(), validate(), controller.getList);

router.post('/upload', auth(), validate(), controller.upload);

export default router;
