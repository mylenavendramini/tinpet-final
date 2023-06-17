import { getAllDogs, createDog, putAndCheckMatch } from '../models/index';
import { Context } from 'koa';
import { IDog } from '../models/Interfaces';

async function getAllDogsController(ctx: Context) {
  try {
    const dogs = await getAllDogs();
    ctx.body = dogs;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
  }
}

async function createDogController(ctx: Context) {
  const dog = ctx.request.body as IDog;
  const user_id = ctx.params.id;
  try {
    const { id, name, age, gender, about, url } = dog;
    const newDog = await createDog(dog, user_id);
    console.log(newDog, 'controller');
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
}

async function putLikeDogController(ctx: Context) {
  const myDogIdObj = ctx.request.body as number;
  const likedDogId = ctx.params.id;
  try {
    const likedDog = await putAndCheckMatch(myDogIdObj, likedDogId);
    console.log({ likedDog });
    ctx.body = likedDog;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
  }
}

export { getAllDogsController, createDogController, putLikeDogController };
