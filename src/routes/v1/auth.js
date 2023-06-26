import express from 'express';
import controller from '../../controllers/auth';

const router = express.Router();

router.post('/signup', auth(), validate(), controller.signUp);
router.post('/signin', auth(), validate(), controller.signIn);
router.post('/new_token', auth(), validate(), controller.updateToken);
router.post('/signout', auth(), validate(), controller.signOut);

export default router;
