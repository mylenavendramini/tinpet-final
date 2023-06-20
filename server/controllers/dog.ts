import {
  getAllDogs,
  createDog,
  likeAndMatch,
  getDogMatchesArray,
  getDogsByUserId,
} from '../models/index';
import { Context } from 'koa';
import { IDog, IdObject } from '../models/Interfaces';

async function getAllDogsController(ctx: Context) {
  try {
    const dogs = await getAllDogs();
    ctx.body = dogs;
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.body = { error: 'Failed to retrieve dogs' };
    ctx.status = 500;
  }
}

async function getDogsOfUser(ctx: Context) {
  const user_id = ctx.params.id;
  try {
    const dogs = await getDogsByUserId(user_id);
    ctx.body = dogs;
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.body = { error: "Failed to retrieve user's dogs" };
    ctx.status = 500;
  }
}

async function createDogController(ctx: Context) {
  const dog = ctx.request.body as IDog;
  const user_id = ctx.params.id;
  try {
    const newDog = await createDog(dog, user_id);
    ctx.body = newDog;
    ctx.status = 201;
    console.log(newDog, 'controller');
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to create the dog' };
  }
}

async function likeAndMatchController(ctx: Context) {
  const myDogIdObj = ctx.request.body as IdObject;
  const likedDogId = ctx.params.id;
  try {
    const likedDog = await likeAndMatch(myDogIdObj, likedDogId);
    ctx.status = 200;
    ctx.body = likedDog;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to like/match dog' };
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
    ctx.body = { error: 'Failed to retrieve all dogs' };
  }
}

export {
  getAllDogsController,
  getDogsOfUser,
  createDogController,
  likeAndMatchController,
  getAllDogMatches,
};
