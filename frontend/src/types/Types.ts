export type User = {
  email : string ;
  password : string ;
}

export type Dog = {
  id: number,
  name: string,
  age: number,
  gender: string,
  about: string,
  url: string,
  liked_dog: number[],
  createdAt: Date,
  updatedAt: Date,
}