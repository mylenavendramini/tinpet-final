// import { describe, expect, test } from '@jest/globals';
const { describe, expect, test } = require('@jest/globals')
const { Sequelize } = require('sequelize');
const { initModels } = require('../compiled/models/associations');
const { MockDog, MockAnotherDog, MockAnotherOneDog, MockUser, MockAnotherUser } = require('./mocks')
const { getUser, createUser, getAllDogs, createDog, putAndCheckMatch, getDogMatchesArray } = require('../compiled/models/index');
const { createUserController } = require('../compiled/controllers/user');

const { User } = require('../compiled/models/User')
const dotenv = require('dotenv');
dotenv.config();

let db_test;

beforeAll(() => {
  db_test = new Sequelize(
    'dog_test',
    'postgres',
    process.env.POSTGRES_DB_PASSWORD,
    {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
    }
  );
});

afterAll(async () => {
  await db_test.close();
});

describe('database is connected', () => {
  test('should connect to the database successfully', async () => {
    const testConnection = async () => {
      try {
        initModels(db_test);
        await db_test.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.log('Unable to connect to the database:', error);
      }
    };
    await testConnection();

    // assertion
  });
})

describe('get user', () => {
  it('should return the user', async () => {

  });

  it('should have an user id as a parameter', async () => {

  });

})

describe('create user', () => {
  it('should create a new user', async () => {
    // create = jest.fn();
    User.create = jest.fn().mockResolvedValueOnce(MockUser);

    // input user object:
    const user = {
      username: 'Mike',
      email: 'mike@example.com',
      password: 'mockpassword',
    };

    // create user with createUser function (models/index)
    const newUser = await createUser(MockUser);
    console.log(newUser)

    // check the parameters
    expect(User.create).toHaveBeenCalledWith(MockUser);
    // expect(User.create).toHaveBeenCalledWith({
    //   id: 1,
    //   username: 'Mike',
    //   email: 'mike@example.com',
    //   password: 'mockpassword',
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });

    // check the returned user
    expect(newUser).toEqual({
      id: 1,
      username: 'Mike',
      email: 'mike@example.com',
      password: 'mockpassword',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  })



})


