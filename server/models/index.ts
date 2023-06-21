import { IUser, IDog, IdObject } from './Interfaces';
import { Message } from './Message';
import db from './db';

const User = db.User;
const Dog = db.Dog;
const MessageModel = db.Message


async function getUser(userId: number) {
  try {
    // const user = await User.findOne(include: [{}]{ where: { id: userId } });
    const user = await User.findOne({
      include: [{
          model: Dog,
          required: true,
          as:'dogs',
          where:{userId: userId},
      }],
      where: {
         id: userId
      }
    })
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
        as:'dogs'
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
// where: { post_url: post_url },
// include: [
//    { association: 'postAuthor', attributes: ['name'] },
//    {
//       association: 'comments', attributes: ['comment'],
//       include: [{
//          association: 'commentAuthor',
//          attributes: ['name']
//       }]
//    }
// ]
// });


// model: Dog,
// required: true,
// as:'likedDogs'

// include: [{
//   model: Dog,
//   required: true,
//   as:'dogs',
//   where:{userId: userId},
// }],
async function getAllDogs() {
  try {
    const dogs = await Dog.findAll({
      include: [{
        model: MessageModel,
        as:'message'
      }],
    });
    return dogs;
  } catch (error) {
    throw new Error('Unable to get all the dogs');
  }
}
// async function getAllDogs() {
//   try {
//     const dogs = await Dog.findAll({
//       include: [
//         {association:'likedDogs'},
//         {association: 'matchedDogs'}
//       ],
//     });
//     return dogs;
//   } catch (error) {
//     throw new Error('Unable to get all the dogs');
//   }
// }

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
    // const user = await User.findOne({ where: { id: parsedId } });
    await newDog.setUser(parsedId);
    return newDog;
  } catch (error) {
    throw new Error('Unable to create a dog');
  }
}

async function getDogsByUserId(userId: number) {
  try {
    const dogs = await Dog.findAll({
      include: [
        {association:'likedDogs'},
        {association: 'matchedDogs'}
      ],
      where: { id: userId }
    });
    return dogs;
  } catch (error) {
    throw new Error('Unable to get all the dogs');
  }
}
// async function getDogsByUserId(userId: number) {
//   try {
//     const user = await User.findOne({
//       where: { id: userId },
//       include: { model: Dog, as: 'dogs' },
//     });
//     if (user && user.dogs) {
//       const dogs = user.dogs;
//       return dogs;
//     } else {
//       console.log('Dogs not found');
//       return undefined;
//     }
//   } catch (error) {
//     throw new Error('Unable to get a dog');
//   }
// }

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
    const parsedOtherDogId  = Number(theOtherDogId)
    const myDog = await Dog.findOne({ where: { id: myDogIdObj.id } });
    // const theOtherDog = await Dog.findOne({
    //   where: { id: Number(theOtherDogId) },
    // })
    await myDog?.addDog(parsedOtherDogId)
    return myDog;
    } catch(error) {
      throw new Error('Unable to like a dog');
    }
}

// const user = await User.findOne({ where: { id: parsedId } });
// await newDog.setUser(parsedId);
// async function likeAndMatch(myDogIdObj: IdObject, theOtherDogId: number) {
//   try {
//     const myDog = (await Dog.findOne({ where: { id: myDogIdObj.id } })) as IDog;
//     const theOtherDog = (await Dog.findOne({
//       where: { id: Number(theOtherDogId) },
//     })) as IDog;
//     const myDogLikesArray = myDog?.liked_dog as number[];
//     const theOtherDogLikesArray = theOtherDog?.liked_dog as number[];
//     const myDogMatches = myDog?.matches_dogs as number[];
//     const theOtherDogMatches = theOtherDog?.matches_dogs as number[];

//     // Check if it's a match and add to matches_dogs:
//     if (theOtherDogLikesArray.includes(myDog?.id as number)) {
//       addMatch(myDogMatches, theOtherDog, myDog);
//       addMatch(theOtherDogMatches, myDog, theOtherDog);
//       filterDogArray(myDogLikesArray, myDog?.id as number, theOtherDogId);
//       filterDogArray(theOtherDogLikesArray, theOtherDogId, myDog?.id as number);
//       return myDog;
//     }
//     // Add the dog that my dog like:
//     if (!myDogLikesArray.includes(theOtherDogId)) {
//       addLike(myDogLikesArray, theOtherDog, myDog);
//       return myDog;
//     }
//   } catch (error) {
//     throw new Error('Unable to like a dog');
//   }
// }

async function getDogMatchesArray(dogId: number) {
  try {
    const dog = await Dog.findOne({ where: { id: dogId } });
    const matches = dog?.matches_dogs;
    return matches;
  } catch (error) {
    throw new Error('Unable to get the matches');
  }
}

async function createMessage(body: Message, sender_id:number) {
  const { content, receiver_id, receiver_name } = body;
  try {
    console.log(content,
      receiver_id,
      receiver_name,
      sender_id)
    const newMessage = await MessageModel.create({
      content,
      receiver_id,
      receiver_name
    });
    await newMessage.setMessage(sender_id)
    return newMessage;
  } catch (error) {
    throw new Error('Unable to create a message');
  }
}
// async function createMessage(body: Message) {
//   const { content, sender_id, sender_name, receiver_id, receiver_name } = body;
//   try {
//     const newMessage = await Message.create({
//       content,
//       sender_id,
//       sender_name,
//       receiver_id,
//       receiver_name,
//     });
//     return newMessage;
//   } catch (error) {
//     throw new Error('Unable to create a message');
//   }
// }

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
