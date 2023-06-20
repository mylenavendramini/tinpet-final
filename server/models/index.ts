// import { Dog } from './Dog';
import { IUser, IDog, IMessage } from './Interfaces';
// import { User } from './User';
import { Message } from './Message';

import db from './db';

const User = db.User;
const Dog = db.Dog;

async function getUser(userId: number): Promise<User | null | undefined> {
  try {
    const user = await User.findOne({ where: { id: userId } });
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function login(body: IUser) {
  try {
    console.log(body);
    const user = await User.findOne({ where: { email: body.email } });
    if (user?.password == body.password) {
      return user;
    }
  } catch (error) {
    console.log(
      'Well thats funny cause something went wrong while logging in.'
    );
  }
}

async function createUser(user: IUser): Promise<User | undefined> {
  try {
    const { username, email, password } = user;
    const newUser = (await User.create({
      username,
      email,
      password,
    })) as User;
    console.log(newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('User creation failed.');
  }
}

async function getAllDogs() {
  try {
    const dogs = await Dog.findAll();
    return dogs;
  } catch (error) {
    console.log(error);
  }
}

async function createDog(dog: IDog, userId: number): Promise<Dog | undefined> {
  try {
    const { name, age, gender, about, url } = dog;
    const user_id = Number(userId);
    const newDog = await Dog.create({
      name,
      age,
      gender,
      about,
      url,
      liked_dog: [],
      matches_dogs: [],
    });
    // console.log(newDog)
    const user = await User.findOne({ where: { id: user_id } });
    // user?.addDog(newDog);
    await newDog.setUser(user_id);
    console.log(newDog, 'MODEL');
    console.log(user?.dogs);
    return newDog;
  } catch (error) {
    console.log(error);
  }
}

async function getDogsByUserId(userId: number): Promise<Dog[] | undefined> {
  try {
    const user = await User.findOne({
      where: { id: userId },
      include: { model: Dog, as: 'dogs' },
    });
    // console.log({ user });
    console.log(user?.dogs);
    if (user && user.dogs) {
      const dogs = user.dogs;
      // console.log(dogs, 'model');
      return dogs;
    } else {
      console.log('Dogs not found');
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function filterDogArray(
  array: number[],
  myDogId: number,
  theOtherDogId: number
) {
  const filteredDog = array.filter((el) => el !== theOtherDogId);
  await Dog.update(
    {
      liked_dog: [...filteredDog],
    },
    { where: { id: myDogId } }
  );
}

async function putAndCheckMatch(myDogIdObj: {}, theOtherDogId: number) {
  console.log('before the try');
  try {
    console.log('inside the try');
    console.log({ myDogIdObj });
    console.log({ theOtherDogId });
    const myDog = await Dog.findOne({ where: myDogIdObj });
    const theOtherDog = await Dog.findOne({
      where: { id: Number(theOtherDogId) },
    });
    console.log({ myDog });
    const myDogArray = myDog?.liked_dog as number[];
    const theOtherDogArray = theOtherDog?.liked_dog as number[];
    const myDogMatches = myDog?.matches_dogs as number[];
    const theOtherDogMatches = theOtherDog?.matches_dogs as number[];

    // Check if it's a match and add to matches_dogs:
    if (theOtherDogArray.includes(myDog?.id as number)) {
      const newMatch = await Dog.update(
        {
          matches_dogs: [...myDogMatches, Number(theOtherDogId)],
        },
        { where: myDogIdObj }
      );
      await Dog.update(
        {
          matches_dogs: [...theOtherDogMatches, Number(myDog!.id)],
        },
        { where: { id: theOtherDogId } }
      );

      filterDogArray(myDogArray, myDog?.id as number, theOtherDogId);
      filterDogArray(theOtherDogArray, theOtherDogId, myDog?.id as number);

      return myDog;
    }

    // Add the dog that my dog like:
    if (!myDogArray.includes(theOtherDogId)) {
      const likeDog = await Dog.update(
        {
          liked_dog: [...myDogArray, Number(theOtherDogId)],
        },
        { where: myDogIdObj }
      );
      return myDog;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getDogMatchesArray(dogId: number) {
  try {
    const dog = await Dog.findOne({ where: { id: dogId } });
    const matches = dog?.matches_dogs;
    return matches;
  } catch (error) {
    console.log(error);
  }
}

async function createMessage(body: {}):Promise<IMessage | undefined> {
  const { content, sender, receiver } = body as Message;
  try {
    console.log(body)
    const newMessage = await Message.create({
      content,
      sender,
      receiver,
    });
    return newMessage;
  } catch (e) {
    console.log(
      'DAWG creating a message is simple dont be stupid and go modify your model function'
    );
  }
}

async function getMessages(id: number):Promise<IMessage[] | undefined> {
  console.log(id)
  try {
    const messages = await Message.findAll({ where: { sender: id } });
    return messages;
  } catch (e) {
    console.log('Yo open your eyes Im sure you can find those messages go back to your model function');
  }
}

// (async () => {
//   await db.sync();
// })();

export {
  getUser,
  createUser,
  createDog,
  getAllDogs,
  getDogsByUserId,
  putAndCheckMatch,
  getDogMatchesArray,
  createMessage,
  getMessages,
  login,
};
