// import {User} from '../models/user
// import { Context } from 'koa';




// async function getUser(ctx: Context){
//     try {
//         const {id} = ctx.params;
//         const user = await User.getUser(id);
//     if(!user){
//     ctx.status= 404;
//     ctx.body= {error: 'User not found'}
//     }else{
//     ctx.body = user;
//     }
//     }catch (error){
//     ctx.status = 500;
//     ctx.body = { error: 'Internal server error' };
//     }
// }




// async function createUser(ctx: Context) {
//     try {
//         const userData = ctx.request.body;
//         const newUser = await User.createUser(userData);
//         ctx.body = newUser;
//     } catch (e) {
//         ctx.status = 500;
//         ctx.body = { error: 'Internal server error' };
//     }
// };


// module.exports= {getUser, createUser};