export type User = {
  username: string;
  email: string;
  password: string;
  id?: number;
};

export type Dog = {
  // id?: number; changed it cause MatchedDogs is complaining
  id?: number;
  name: string;
  age: number;
  gender: string;
  about: string;
  url: string;
  liked_dog: number[];
  matches_dogs: number[];
  createdAt?: Date;
  updatedAt?: Date;
  userId?: number;
};

export type Message = {
  id?: number;
  content: string;
  sender: number;
  receiver: number;
  createdAt?: Date;
  updatedAt?: Date;
};
