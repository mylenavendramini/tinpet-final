import Router from 'koa-router';
import { getUserController, createUserController } from '../controllers/user';
import {
  getAllDogsController,
  createDogController,
  getMatchesController,
  putLikeDogController,
} from '../controllers/dog';
const router = new Router();

router.post('/user', createUserController);
router.post('/dogs/:id', createDogController);
router.get('/user/:id', getUserController);
router.get('/dogs', getAllDogsController);
router.get('/matches', getMatchesController);
router.put('/dogs/:id', putLikeDogController);

export default router;
