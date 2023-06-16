import { Context } from 'koa';
import { IUser } from '../models/Interfaces';
import { getUser, createUser } from '../models/index';

async function getUserController(ctx: Context) {
  try {
    const userId: number = parseInt(ctx.params.userId);
    const user = await getUser(userId);
    ctx.body = user;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
}

async function createUserController(ctx: Context) {
  try {
    const user = ctx.request.body as IUser;
    const { id, username, email, password } = user;
    const newUser = await createUser(user);
    // console.log(newUser);
    ctx.body = newUser;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
  }
}

export { getUserController, createUserController };
