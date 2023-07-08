import { IUser, IDog, IdObject, IMessage } from './Interfaces';
import db from './db';
const saltRounds = 12;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY || 'not-so-secret';
const User = db.User;
const Dog = db.Dog;
const Message = db.Message;

async function getUser(userId: number) {
  try {
    const user = await User.findOne({
      include: [
        {
          model: Dog,
          required: false,
          as: 'dogs',
          where: { userId: userId },
          include: [{ model: Message, as: 'messages' }],
        },
      ],
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
      include: [
        {
          model: Dog,
          required: false,
          as: 'dogs',
        },
      ],
      where: { email },
    });
    const valid = await bcrypt.compare(password, user?.password as string)
    const accessToken = jwt.sign({ id: user?.id }, SECRET_KEY, { expiresIn: '12h' });
    if(valid) {
      return {user, accessToken}
    } else {
      throw new Error('Email and Password does not match.')
    }
  } catch (error) {
    throw new Error('Unable to login');
  }
}

async function createUser(user: IUser) {
  try {
    const { username, email, password } = user;
    const prevPassword = password
    const newUser = await User.create({
      username,
      email,
      password: await bcrypt.hash(
        prevPassword,
        saltRounds
      ),
    });
    const accessToken = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: '12h' });
    return {user:newUser, accessToken};
  } catch (error) {
    throw new Error('User creation failed.');
  }
}

async function getAllDogs() {
  try {
    const dogs = await Dog.findAll({
      include: [{ model: Message, as: 'messages' }],
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
    const user = await User.findOne({ where: { id: parsedId } });
    await newDog.setUser(parsedId);
    return newDog;
  } catch (error) {
    throw new Error('Unable to create a dog');
  }
}

async function getDogsByUserId(userId: number) {
  try {
    const user = await User.findOne({
      where: { id: userId },
      include: { model: Dog, as: 'dogs' },
    });
    if (user && user.dogs) {
      const dogs = user.dogs;
      return dogs;
    } else {
      return undefined;
    }
  } catch (error) {
    throw new Error('Unable to get a dog');
  }
}

async function filterDogArray(
  array: number[],
  myDogId: number,
  theOtherDogId: number
) {
  const filteredDog = array.filter((dogId) => dogId !== theOtherDogId);
  await Dog.update(
    {
      liked_dog: [...filteredDog],
    },
    { where: { id: myDogId } }
  );
}

async function addMatch(
  myDogMatches: number[],
  theOtherDog: IDog,
  myDog: IDog
) {
  if (!myDog.matches_dogs.includes(Number(theOtherDog.id))) {
    const newMatch = await Dog.update(
      {
        matches_dogs: [...myDogMatches, Number(theOtherDog.id)],
      },
      { where: { id: Number(myDog.id) } }
    );
    return newMatch;
  }
}

async function addLike(
  myDogLikesArray: number[],
  theOtherDog: IDog,
  myDog: IDog
) {
  if (
    !myDog.matches_dogs.includes(Number(theOtherDog.id)) &&
    !myDog.liked_dog.includes(Number(theOtherDog.id))
  ) {
    const likeDog = await Dog.update(
      {
        liked_dog: [...myDogLikesArray, Number(theOtherDog.id)],
      },
      { where: { id: Number(myDog.id) } }
    );
    return likeDog;
  }
}

async function likeAndMatch(myDogIdObj: IdObject, theOtherDogId: number) {
  try {
    const myDog = (await Dog.findOne({ where: { id: myDogIdObj.id } })) as IDog;
    const theOtherDog = (await Dog.findOne({
      where: { id: Number(theOtherDogId) },
    })) as IDog;
    const myDogLikesArray = myDog?.liked_dog as number[];
    const theOtherDogLikesArray = theOtherDog?.liked_dog as number[];
    const myDogMatches = myDog?.matches_dogs as number[];
    const theOtherDogMatches = theOtherDog?.matches_dogs as number[];
    if (theOtherDogLikesArray.includes(myDog?.id as number)) {
      addMatch(myDogMatches, theOtherDog, myDog);
      addMatch(theOtherDogMatches, myDog, theOtherDog);
      filterDogArray(myDogLikesArray, myDog?.id as number, theOtherDogId);
      filterDogArray(theOtherDogLikesArray, theOtherDogId, myDog?.id as number);
      return myDog;
    }
    if (!myDogLikesArray.includes(theOtherDogId)) {
      addLike(myDogLikesArray, theOtherDog, myDog);
      return myDog;
    }
  } catch (error) {
    throw new Error('Unable to like a dog');
  }
}

async function getDogMatchesArray(dogId: number) {
  try {
    const dog = await Dog.findOne({ where: { id: dogId } });
    const matches = dog?.matches_dogs;
    return matches;
  } catch (error) {
    throw new Error('Unable to get the matches');
  }
}

async function createMessage(body: IMessage, sender_id: number) {
  const { content, receiver_id, receiver_name } = body;
  try {
    const sender = await Dog.findOne({ where: { id: sender_id } });
    const newMessage = await Message.create({
      content,
      receiver_id,
      receiver_name,
    });
    sender?.addMessage(newMessage);
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
  getDogsByUserId,
  likeAndMatch,
  getDogMatchesArray,
  createMessage,
  getMessages,
  login,
};
