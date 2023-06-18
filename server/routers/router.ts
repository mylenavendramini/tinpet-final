import Router from 'koa-router';
import { getUserController, createUserController } from '../controllers/user';
import {
  getAllDogsController,
  getDogsOfUser,
  createDogController,
  putLikeDogController,
  getAllDogMatches,
} from '../controllers/dog';
const router = new Router();

router.post('/user', createUserController);
router.post('/dogs/:id', createDogController);
router.get('/user/:id', getUserController);
router.get('/dogs', getAllDogsController);
router.get('/dogs/:id', getDogsOfUser);
router.get('/matches/:id', getAllDogMatches);
router.put('/dogs/:id', putLikeDogController);

export default router;
