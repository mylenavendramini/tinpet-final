import { createMessage, getMessages } from "../models";
import { Context } from 'koa';
import { Message } from "../models/Message";


async function createMessageController(ctx: Context) {
  try {
    const newMessage = await createMessage(ctx.request.body as Message);
    ctx.body = newMessage;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Its funny cause you cant even create a message, BTW this is in the controller' };
  }
}

async function getMessagesController(ctx: Context) {
  try {
    const userId: number = parseInt(ctx.params.id);
    const messages = await getMessages(userId)
    ctx.body = messages
  } catch (error) {
    ctx.status = 500;
    ctx.body = {error: 'Come on man are you even trying???PS: your getMessage broke on the controller'}
  }
}

export {
  createMessageController,
  getMessagesController
};