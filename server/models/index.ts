import { Dog } from './Dog';
import { IUser, IDog } from './Interfaces';
import { Matches } from './Matches';
import { User } from './User';
import db from './db';

async function getUser(userId: number): Promise<User | null | undefined> {
  // console.log({ userId });
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
    });
    const user = await User.findOne({ where: { id: user_id } });
    user?.addDog(newDog);
    console.log(newDog, 'model');
    return newDog;
  } catch (error) {
    console.log(error);
  }
}

async function putLikeDog(myDogIdObj: {}, likedDogId: number) {
  console.log('before the try');
  try {
    console.log('inside the try');
    console.log(myDogIdObj);
    const dog = await Dog.findOne({ where: myDogIdObj });
    console.log({ dog });
    const likedDog = dog?.liked_dog as number[];
    console.log({ likedDog });
    console.log({ likedDogId });
    const likeDog = await Dog.update(
      {
        liked_dog: [...likedDog, Number(likedDogId)],
      },
      { where: myDogIdObj }
    );
    console.log({ likeDog });
    return likeDog;
  } catch (error) {
    console.log(error);
  }
}

async function getMatches(): Promise<Matches[] | undefined> {
  try {
    const matches = await Matches.findAll();
    return matches;
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  await db.sync();
})();

export { getUser, createUser, createDog, getAllDogs, putLikeDog, getMatches };
