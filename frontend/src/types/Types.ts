export type User = {
  username: string;
  email: string;
  password: string;
  id?: number;
  dogs: Dog[];
};

export type Dog = {
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
  messages?: Message[];
};

export type Message = {
  id?: number;
  content: string;
  receiver_id: number;
  receiver_name: string;
  createdAt?: Date;
  updatedAt?: Date;
};
