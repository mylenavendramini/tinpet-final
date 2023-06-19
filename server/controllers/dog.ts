import {
  getAllDogs,
  createDog,
  putAndCheckMatch,
  getDogMatchesArray,
  getDogsByUserId,
} from '../models/index';
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

async function getDogsOfUser(ctx: Context) {
  console.log('working');
  const user_id = ctx.params.id;
  console.log(user_id);
  try {
    const dogs = await getDogsByUserId(user_id);
    console.log({ dogs });
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
    const newDog = await createDog(dog, user_id);
    ctx.body = newDog;
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

async function getAllDogMatches(ctx: Context) {
  const dogId = ctx.params.id;
  try {
    const matches = await getDogMatchesArray(dogId);
    ctx.body = matches;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
  }
}

export {
  getAllDogsController,
  getDogsOfUser,
  createDogController,
  putLikeDogController,
  getAllDogMatches,
};
