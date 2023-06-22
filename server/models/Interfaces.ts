export interface IUser {
  id?: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDog {
  id?: number;
  name: string;
  age: number;
  gender: string;
  about: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessage {
  id?: number;
  sender_id: number;
  receiver_id: number;
  sender_name: string;
  receiver_name: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IdObject {
  id: number;
}
