import Router from 'koa-router';
import {
  getUserController,
  createUserController,
  loginController,
} from '../controllers/user';
import {
  getAllDogsController,
  getDogsOfUser,
  createDogController,
  likeAndMatchController,
  getAllDogMatches,
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
router.get('/dogs/:id', getDogsOfUser);
router.get('/matches/:id', getAllDogMatches);
router.put('/dogs/:id', likeAndMatchController);

export default router;
