// import { describe, expect, test } from '@jest/globals';
const { describe, expect, test } = require('@jest/globals')
const { Sequelize } = require('sequelize');
const { initModels } = require('../compiled/models/associations');
const { getUser, createUser, getAllDogs, createDog, putAndCheckMatch, getDogMatchesArray } = require('../compiled/models/index');
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
  });
})

describe('get user', () => {
  test('should return user', async () => {

  });

})


