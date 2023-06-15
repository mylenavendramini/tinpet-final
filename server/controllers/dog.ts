// import {Dog} from '../models/dog
// import { Context } from 'koa';




// async function getAllDogs(ctx: Context){
// try {
//     const dogs = await Dog.getAllDogs()
//     ctx.status = 200;
//     ctx.body = dogs;
// } catch (error) {
//     ctx.status = 500;
//     ctx.body = { error: error.message  };
// }
//};



// async function createDog(ctx: Context) {
//     try {
//         const dogData = ctx.request.body;
//         const newDog = await Dog.createDog(dogData);
//         ctx.body = newDog;
//     } catch (e) {
//         ctx.status = 500;
//         ctx.body = { error: 'Internal server error' };
//     }
// };



// async function getMatches(ctx: Context){
// try {
//     const matches = await Dog.getMatches()
//     ctx.status = 200;
//     ctx.body = matches;
// } catch (error) {
//     ctx.status = 500;
//     ctx.body = { error: error.message  };
// }
//};





// module.exports= {getAllDogs, createDog};