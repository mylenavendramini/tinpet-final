
const { describe, expect, test } = require('@jest/globals')
const { MockDog, MockAnotherDog, MockAnotherOneDog, MockUser, MockAnotherUser } = require('./mocks')
const Sequelize = require('sequelize')
const { initModels } = require('../compiled/models/associations');
const Koa = require('koa');
const Router = require('koa-router');
const { createServer } = require('http');
const request = require('supertest');
const app = new Koa();
const router = new Router();

app
  .use(router.routes())
  .use(router.allowedMethods());

server = createServer(app.callback());
const dotenv = require('dotenv');
dotenv.config();

let db_test = new Sequelize(
  'dog_test',
  'postgres',
  `${process.env.POSTGRES_DB_PASSWORD}`,
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  }
);
const { Dog, User } = initModels(db_test);

let syncResponse;

beforeAll(async () => {
  syncResponse = await db_test.sync();
  await db_test.authenticate();

})

afterAll(async () => {
  await db_test.close();
  server.close();
});

describe('database is connected', () => {
  test('should connect to the database successfully', async () => {
    expect(syncResponse.config.database).toBe('dog_test');
  });
})


// describe('get user', () => {
//   it('should return the user', async () => {
//     const response = await request(server)
//       .get('/user/1')
//       .set('Accept', 'application/json')
//     expect(response.status).toEqual(200);
//     expect(response.body).toEqual(MockUser);
//   });

// })

// describe('create user', () => {
//   it('should create a new user', async () => {
//     // create = jest.fn();
//     User.create = jest.fn().mockResolvedValueOnce(MockUser);

//     // input user object:
//     const user = {
//       username: 'Mike',
//       email: 'mike@example.com',
//       password: 'mockpassword',
//     };

//     // create user with createUser function (models/index)
//     const newUser = await createUser(MockUser);
//     console.log(newUser)

//     // check the parameters
//     expect(User.create).toHaveBeenCalledWith(MockUser);
//     // expect(User.create).toHaveBeenCalledWith({
//     //   id: 1,
//     //   username: 'Mike',
//     //   email: 'mike@example.com',
//     //   password: 'mockpassword',
//     //   createdAt: new Date(),
//     //   updatedAt: new Date(),
//     // });

//     // check the returned user
//     expect(newUser).toEqual({
//       id: 1,
//       username: 'Mike',
//       email: 'mike@example.com',
//       password: 'mockpassword',
//       createdAt: expect.any(Date),
//       updatedAt: expect.any(Date),
//     });
//   })



// })