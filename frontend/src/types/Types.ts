export type User = {
  username: string;
  email: string;
  password: string;
  id?: number;
  dogs: Dog[];
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
  messages: Message[];
};

export type Message = {
  id?: number;
  content: string;
  sender_id: number;
  receiver_id: number;
  sender_name: string;
  receiver_name: string;
  createdAt?: Date;
  updatedAt?: Date;
};
