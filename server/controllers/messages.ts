import { createMessage, getMessages } from '../models';
import { Context } from 'koa';
import { Message } from '../models/Message';

async function createMessageController(ctx: Context) {
  try {
    const sender_id = ctx.params.id
    const newMessage = await createMessage(ctx.request.body as Message, sender_id);
    ctx.body = newMessage;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to create message' };
  }
}

async function getMessagesController(ctx: Context) {
  try {
    const messages = await getMessages();
    ctx.body = messages;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to get messages' };
  }
}

export { createMessageController, getMessagesController };
