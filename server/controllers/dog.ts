import { getAllDogs, createDog, putLikeDog, getMatches } from '../models/index'
import { Context } from 'koa';
import { Dog } from '../models/Dog';
import { IDog } from '../models/Interfaces';
import { Matches } from '../models/Matches';

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
    const dog: IDog = ctx.request.body as IDog;
    try {
        const { id, name, age, gender, about, url } = dog;
        const newDog = await createDog(dog);
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
}

async function getMatchesController(ctx: Context) {
    try {
        const matches = await getMatches();
        ctx.body = matches;
    } catch (error) {
        console.log(error);
        ctx.status = 500;
    }
}

async function putLikeDogController(ctx: Context) {
    const dog: IDog = ctx.request.body as IDog;
    const id: number = parseInt(ctx.params.id);
    try {
        const likedDog = await putLikeDog(dog, id);
        ctx.body = likedDog;
    } catch (error) {
        console.log(error);
        ctx.status = 500;
    }
}



module.exports = { getAllDogsController, createDogController, getMatchesController, putLikeDogController };