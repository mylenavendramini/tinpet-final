export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDog {
  id: number;
  name: string;
  age: number;
  gender: string;
  about: string;
  url: string;
  liked_dog: Array<number> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMatches {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
