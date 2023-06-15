import { CreationOptional } from 'sequelize';

export interface IUser {
  id: CreationOptional<number>;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDog {
  id: CreationOptional<number>;
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
  id: CreationOptional<number>;
  createdAt: Date;
  updatedAt: Date;
}
