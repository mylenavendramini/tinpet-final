import { Dog } from './Dog';
import { IUser, IDog } from './Interfaces';
import { Matches } from './Matches';
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
  console.log(typeof User);
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

async function createDog(dog: IDog): Promise<Dog | undefined> {
  try {
    const { id, name, age, gender, about, url } = dog;
    const newDog = await Dog.create({
      id,
      name,
      age,
      gender,
      about,
      url,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return newDog;
  } catch (error) {
    console.log(error);
  }
}

async function putLikeDog(dog: IDog, id: number) {
  try {
    const likedDog = dog.liked_dog;
    const likeDog = await Dog.update(
      {
        liked_dog: [...likedDog, id],
      },
      { where: { id: dog.id } }
    );
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
