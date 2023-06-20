'use strict';
const { createDog } = require('../compiled/models/index')

const MockUser = {
  username: 'Mike',
  email: 'mike@example.com',
  password: 'mockpassword',
}

const MockDog = {
  name: 'Lily',
  age: 3,
  gender: 'female',
  about: 'grumpy dog',
  url: '/',
}

const MockUserOutput = {
  id: 1,
  username: 'Mike',
  email: 'mike@example.com',
  password: 'mockpassword',
  createdAt: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }),
  updatedAt: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }),
}

const MockFnCreateDog = jest.fn(createDog(MockDog, 1));

// const MockDogOutput = {
//   id: 1,
//   name: 'Lily',
//   age: 3,
//   gender: 'female',
//   about: 'grumpy dog',
//   url: '/',
//   liked_dog: [],
//   matches_dog: [],
//   userId: 1,
//   likedDogId: null,
//   dogId: null,
//   updatedAt: new Date(),
//   createdAt: new Date(),
// }



module.exports = { MockUser, MockDog, MockFnCreateDog }