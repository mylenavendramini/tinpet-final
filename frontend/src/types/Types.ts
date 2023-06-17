export type User = {
  email: string;
  password: string;
  id: number;
};

export type Dog = {
  id: number;
  name: string;
  age: number;
  gender: string;
  about: string;
  url: string;
  liked_dog: number[];
  matches_dogs: number[];
  createdAt: Date;
  updatedAt: Date;
  user: number;
};
