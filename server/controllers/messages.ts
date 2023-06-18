import { createMessage, getMessages } from "../models";
import { Context } from 'koa';
import { Message } from "../models/Messages";


async function createMessageController(ctx: Context) {
  try {
    const newMessage = await createMessage(ctx.body as Message);
    ctx.body = newMessage;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Its funny cause it failed' };
  }
}

async function getMessagesController(ctx: Context) {
  try {
    const userId: number = parseInt(ctx.params.id);
    const messages = getMessages(userId)
    return messages
  } catch (error) {
    ctx.status = 500;
    ctx.body = {error: 'Come on man are you even trying???'}
  }
}

export {
  createMessageController,
  getMessagesController
};