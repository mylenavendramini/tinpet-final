import { IUser, IDog, IdObject } from './Interfaces';
import { Message } from './Message';
import db from './db';

const User = db.User;
const Dog = db.Dog;
const MessageModel = db.Message

async function getUser(userId: number) {
  try {
    const user = await User.findOne({
      include: [
        {
          model: Dog,
          required: true,
          as:'dogs',
          where:{userId: userId},
          include: [
            {model: Dog,
            as:'matches'},
            {model: MessageModel,
            as: 'messages'}
          ],
      }],
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    throw new Error('Unable to get the user');
  }
}

async function login(body: IUser) {
  try {
    const { email, password } = body;
    const user = await User.findOne({
      include: [{
        model: Dog,
        required: true,
        as:'dogs',
        include: [
          {model: Dog,
          as:'matches'},
          {model: MessageModel,
          as: 'messages'}
        ],
    }],
     where: { email, password } });
    return user;
  } catch (error) {
    throw new Error('Unable to login');
  }
}

async function createUser(user: IUser) {
  try {
    const { username, email, password } = user;
    const newUser = await User.create({
      username,
      email,
      password,
    });
    return newUser;
  } catch (error) {
    throw new Error('User creation failed.');
  }
}


async function getAllDogs() {
  try {
    const dogs = await Dog.findAll({
      include: [
        {model: Dog,
        as:'matches'},
        {model: MessageModel,
        as: 'messages'}
      ],
    });
    return dogs;
  } catch (error) {
    throw new Error('Unable to get all the dogs');
  }
}


async function createDog(dog: IDog, userId: number) {
  try {
    const { name, age, gender, about, url } = dog;
    const parsedId = Number(userId);
    const newDog = await Dog.create({
      name,
      age,
      gender,
      about,
      url,
      liked_dog: [],
      matches_dogs: [],
    });
    await newDog.setUser(parsedId);
    return newDog;
  } catch (error) {
    throw new Error('Unable to create a dog');
  }
}

async function likeAndMatch(myDogIdObj: IdObject, theOtherDogId: number) {
  try {
    const parsedOtherDogId  = Number(theOtherDogId)
    const parsedMyDogId = Number(myDogIdObj.id)
    const myDog = await Dog.findOne({ where: { id: myDogIdObj.id } });
    const otherDog = await Dog.findOne({ where: { id: theOtherDogId } });
    const likesMyDog = await otherDog?.hasLike(parsedMyDogId)
    const hasLike = await myDog?.hasLike(parsedOtherDogId)
    const matched = await otherDog?.hasMatch(parsedMyDogId)
    if (!hasLike && !likesMyDog && !matched) {
      await myDog?.addLike(parsedOtherDogId)
    } else if (likesMyDog) {
      await otherDog?.addMatch(parsedMyDogId)
      await myDog?.addMatch(parsedOtherDogId)
      await otherDog?.removeLike(parsedMyDogId)
    }
    return myDog;
    } catch(error) {
      throw new Error('Unable to like a dog');
    }
}


async function createMessage(body: Message, sender_id:number) {
  const { content, receiver_id, receiver_name } = body;
  try {
    const sender = await Dog.findOne({ where: { id: sender_id } });
    const newMessage = await MessageModel.create({
      content,
      receiver_id,
      receiver_name
    });
    sender?.addMessage(newMessage)
    return newMessage;
  } catch (error) {
    throw new Error('Unable to create a message');
  }
}

async function getMessages() {
  try {
    const messages = await Message.findAll();
    return messages;
  } catch (error) {
    console.log(error);
    throw new Error('Unable to get a message');
  }
}

export {
  getUser,
  createUser,
  createDog,
  getAllDogs,
  likeAndMatch,
  createMessage,
  getMessages,
  login,
};
