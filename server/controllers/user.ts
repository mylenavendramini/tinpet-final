import { Context } from 'koa';
import { IUser } from '../models/Interfaces';
import { getUser, createUser, login } from '../models/index';

async function getUserController(ctx: Context) {
  try {
    const userId: number = parseInt(ctx.params.id);
    const user = await getUser(userId);
    ctx.body = user;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to retrieve user' };
  }
}

async function createUserController(ctx: Context) {
  try {
    const user = ctx.request.body as IUser;
    const newUser = await createUser(user);
    ctx.body = newUser;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to create user' };
  }
}

async function loginController(ctx: Context) {
  try {
    const user = ctx.request.body as IUser;
    const res = await login(user);
    ctx.body = res;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to login' };
  }
}

export { getUserController, createUserController, loginController };
