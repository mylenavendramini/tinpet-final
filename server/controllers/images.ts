import { Context } from 'koa';
import { IDog } from '../models/Interfaces';
import { url } from 'koa-router';
import { postImage } from "../models";
import Koa from 'koa';


export const postImageController = async (ctx: Koa.ParameterizedContext) => {
    const { id } = ctx.params;
    const { path } = ctx.file;
    try {
        const dog = await postImage(id);
        if (!dog) {
        ctx.status = 404;
        ctx.body = 'Dog not found';
        return;
        }
        dog.url = path;
        await dog.save();
        ctx.status = 200;
        ctx.body = 'Image uploaded successfully';
    } catch (error) {
        console.error('Error uploading image:', error);
        ctx.status = 500;
    }
};









