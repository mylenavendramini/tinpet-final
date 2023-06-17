import { Dog } from './Dog';
import { IUser, IDog } from './Interfaces';
import { User } from './User';
import db from './db';

async function getUser(userId: number): Promise<User | null | undefined> {
  try {
    const user = await User.findOne({ where: { id: userId } });
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function createUser(user: IUser): Promise<User | undefined> {
  try {
    const { id, username, email, password } = user;
    const newUser = (await User.create({
      id,
      username,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    })) as User;
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
    const { id, name, age, gender, about, url } = dog;
    const user_id = Number(userId);
    const newDog = await Dog.create({
      id,
      name,
      age,
      gender,
      about,
      url,
      liked_dog: [],
      matches_dogs: [],
    });
    const user = await User.findOne({ where: { id: user_id } });
    user?.addDog(newDog);
    console.log(newDog, 'model');
    return newDog;
  } catch (error) {
    console.log(error);
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
    console.log(myDogIdObj);
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
    if (theOtherDogArray.includes(myDog!.id)) {
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

      filterDogArray(myDogArray, myDog!.id, theOtherDogId);
      filterDogArray(theOtherDogArray, theOtherDogId, myDog!.id);

      return newMatch;
    }

    // Add the dog that my dog like:
    if (!myDogArray.includes(theOtherDogId)) {
      const likeDog = await Dog.update(
        {
          liked_dog: [...myDogArray, Number(theOtherDogId)],
        },
        { where: myDogIdObj }
      );
      return likeDog;
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

(async () => {
  await db.sync();
})();

export {
  getUser,
  createUser,
  createDog,
  getAllDogs,
  putAndCheckMatch,
  getDogMatchesArray,
};
