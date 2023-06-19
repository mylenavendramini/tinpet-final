'use strict';
// export const MockDog = jest.mock('../compiled/models/Dog', () => {
//   class MockDog {
//     id = 1;
//     name = 'Bob';
//     age = 3;
//     gender = 'Male';
//     about = 'sweet dog';
//     url = 'https://mockdog.com';
//     liked_dog = [];
//     matches_dogs = [];
//     createdAt = new Date();
//     updatedAt = new Date();

//     static associations = {
//       user: {},
//       matches: {},
//     };

//     static initModel = jest.fn();
//   }

//   return {
//     Dog: MockDog,
//   };
// });

// export const MockAnotherDog = jest.mock('../compiled/models/Dog', () => {
//   class MockAnotherDog {
//     id = 2;
//     name = 'Lily';
//     age = 2;
//     gender = 'Female';
//     about = 'grumpy dog';
//     url = 'https://mockdog2.com';
//     liked_dog = [];
//     matches_dogs = [];
//     createdAt = new Date();
//     updatedAt = new Date();

//     static associations = {
//       user: {},
//       matches: {},
//     };

//     static initModel = jest.fn();

//   }

//   return {
//     Dog: MockAnotherDog,
//   };
// });

// export const MockOneAnotherDog = jest.mock('../compiled/models/Dog', () => {
//   class MockOneAnotherDog {
//     id = 3;
//     name = 'Courage';
//     age = 7;
//     gender = 'Male';
//     about = 'cowardly dog';
//     url = 'https://mockdog2.com';
//     liked_dog = [];
//     matches_dogs = [];
//     createdAt = new Date();
//     updatedAt = new Date();

//     static associations = {
//       user: {},
//       matches: {},
//     };

//     static initModel = jest.fn();
//   }

//   return {
//     Dog: MockOneAnotherDog,
//   };
// });



// const MockUser = jest.mock('../compiled/models/User', () => {
//   class MockUser {
//     id = 1;
//     username = 'Mike';
//     email = 'mike@example.com';
//     password = 'mockpassword';
//     createdAt = new Date();
//     updatedAt = new Date();

//     static associations = {
//       dogs: {},
//     };

//     static create = jest.fn();
//     static initModel = jest.fn();
//   }

//   return {
//     User: MockUser,
//   };
// });

// export const MockAnotherUser = jest.mock('../compiled/models/User', () => {
//   class MockAnotherUser {
//     id = 2;
//     username = 'Sara';
//     email = 'sara@example.com';
//     password = 'mockpassword';
//     createdAt = new Date();
//     updatedAt = new Date();

//     static associations = {
//       dogs: {},
//     };

//     static initModel = jest.fn();
//   }

//   return {
//     User: MockAnotherUser,
//   };
// });

const MockUser = {
  id: 1,
  username: 'Mike',
  email: 'mike@example.com',
  password: 'mockpassword',
  // createdAt: new Date(),
  // updatedAt: new Date(),
}


module.exports = { MockUser }