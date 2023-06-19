import Router from 'koa-router';
import { getUserController, createUserController } from '../controllers/user';
import {
  getAllDogsController,
  getDogsOfUser,
  createDogController,
  putLikeDogController,
  getAllDogMatches,

} from '../controllers/dog';
import { Context } from 'koa';
import { createMessageController, getMessagesController } from '../controllers/messages';
import { postImageController } from '../controllers/images';
import multer from 'multer';
import { Request } from 'koa';


const router = new Router();

const upload = multer({ dest: "../../frontend/public/uploads/" });
const uploadMiddleware: Router.IMiddleware = async (ctx: Context, next: () => Promise<any>): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    upload.single('image')(ctx.req as any, ctx.res as any, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
  await next();
};



router.post('/user', createUserController);
router.post('/dogs/:id', createDogController);
router.post('/messages/:id', createMessageController);
router.get('/messages/:id', getMessagesController);
router.get('/user/:id', getUserController);
router.get('/dogs', getAllDogsController);
router.get('/dogs/:id', getDogsOfUser);
router.get('/matches/:id', getAllDogMatches);
router.put('/dogs/:id', putLikeDogController);
router.post("/api/upload", uploadMiddleware, postImageController);


export default router;
