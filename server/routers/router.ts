import Router from 'koa-router';
import {
  getUserController,
  createUserController,
  loginController,
} from '../controllers/user';
import {
  getAllDogsController,
  createDogController,
  likeAndMatchController,
} from '../controllers/dog';
import {
  createMessageController,
  getMessagesController,
} from '../controllers/messages';
const router = new Router();

router.post('/user', createUserController);
router.post('/dogs/:id', createDogController);
router.post('/login', loginController);
router.post('/messages/:id', createMessageController);
router.get('/messages', getMessagesController);
router.get('/user/:id', getUserController);
router.get('/dogs', getAllDogsController);
router.put('/dogs/:id', likeAndMatchController);

export default router;
