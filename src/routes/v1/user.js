import express from 'express';
import controller from '../../controllers/user';

const router = express.Router();

router.get('/:id', auth(), validate(), controller.getOne);

export default router;
