import { createMessage, getMessages } from '../models';
import { Context } from 'koa';
import { Message } from '../models/Message';

async function createMessageController(ctx: Context) {
  try {
    const newMessage = await createMessage(ctx.request.body as Message);
    ctx.body = newMessage;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to create message' };
  }
}

async function getMessagesController(ctx: Context) {
  try {
    const userId: number = parseInt(ctx.params.id);
    const messages = await getMessages(userId);
    ctx.body = messages;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to get messages' };
  }
}

export { createMessageController, getMessagesController };
