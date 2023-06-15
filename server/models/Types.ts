export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Dog {
  id: number;
  name: string;
  age: number;
  gender: string;
  about: string;
  url: string;
  liked_dog: Array<number>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Matches {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
