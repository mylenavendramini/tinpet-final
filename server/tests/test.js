
const { describe, expect, test } = require('@jest/globals')
const { MockUser, MockDog, MockFnCreateDog } = require('./mocks');
const { createUserController, getUserController, loginController } = require('../compiled/controllers/user')
const { createDogController, getDogsOfUser, getAllDogMatches, getAllDogsController, putLikeDogController } = require('../compiled/controllers/dog')
const { createDog } = require('../compiled/models/index')
const Sequelize = require('sequelize')
const { initModels } = require('../compiled/models/associations');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const { createServer } = require('http');
const supertest = require('supertest');
// const router = require('../compiled/routers/router');
// let request = require('supertest');
const app = new Koa();
const router = new Router();
const PORT = 3001;

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


router.post('/user', createUserController);
router.post('/login', loginController);
router.get('/user/:id', getUserController);
router.post('/dogs/:id', createDogController);
router.get('/dogs', getAllDogsController);
router.get('/dogs/:id', getDogsOfUser);
router.put('/dogs/:id', putLikeDogController);
router.get('/matches/:id', getAllDogMatches);

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());



// server = createServer(app.callback());
let server;
server = app.listen(PORT);
// request = supertest(server);
request = supertest(app.callback());
const dotenv = require('dotenv');

dotenv.config();

let syncResponse;

beforeAll(async () => {
  syncResponse = await db_test.sync();
  await db_test.authenticate();
  await User.sync({ force: true });
  await Dog.sync({ force: true });
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

describe('User', () => {
  test('Create user', async () => {
    const mock = MockUser;
    const response = await supertest(app.callback())
      .post('/user',)
      .send(mock);
    expect(response.statusCode).toEqual(201);
    expect(response.body.username).toEqual('Mike');
    expect(typeof response.body.id).toEqual('number');
  });

  describe('Get user', () => {
    beforeEach(async () => {
      const mock = MockUser;
      const response = await supertest(app.callback())
        .post('/user',)
        .send(mock);
    });
    test('Get user', async () => {
      const response = await supertest(app.callback())
        .get('/user/1');
      expect(response.statusCode).toEqual(200);
      expect(response.body.username).toEqual(MockUser.username);
    });
    test('Login', async () => {
      const mock = MockUser;
      const response = await supertest(app.callback())
        .post('/login',)
        .send(mock);
      expect(response.statusCode).toEqual(201);
      expect(response.body.username).toEqual('Mike');
      expect(typeof response.body.id).toEqual('number');
    });
  })
})

describe('Dog', () => {
  beforeEach(async () => {
    const mock = MockUser;
    const response = await supertest(app.callback())
      .post('/user',)
      .send(mock);

  })
  test('Create dog returns a dog', async () => {
    const mock = MockDog;
    const response = await supertest(app.callback())
      .post('/dogs/1',)
      .send(mock);
    expect(response.statusCode).toEqual(201);
    expect(response.body.name).toEqual('Lily');
    expect(typeof response.body.id).toEqual('number');
  });

  // test.only('Dog.create is called with correct arguments and returns expected result', async () => {

  //   Dog.create = jest.fn().mockResolvedValue(MockDog);
  //   const result = await createDog(MockDog, 1);

  //   expect(Dog.create).toHaveBeenCalledWith({
  //     name: 'Lily',
  //     age: 3,
  //     gender: 'female',
  //     about: 'grumpy dog',
  //     url: '/',
  //     liked_dog: [],
  //     matches_dogs: [],
  //   });
  // });

  test('Get all dogs', async () => {
    const response = await supertest(app.callback())
      .get('/dogs');
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].name).toEqual(MockDog.name);
  });

  test('Get dog by user id returns a dog', async () => {
    const response = await supertest(app.callback())
      .get('/dogs/1');
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].name).toEqual(MockDog.name);
  });

  test('Get all matches returns the dog matches', async () => {
    const response = await supertest(app.callback())
      .get('/dogs/1');
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].matches_dogs).toEqual([]);
  });

  // test('Like another dog', async () => {
  //   const mock = MockDog;
  //   const response = await supertest(app.callback())
  //     .post('/dogs/1',)
  //     .send(mock);
  //   expect(response.statusCode).toEqual(201);
  //   expect(response.body.name).toEqual('Lily');
  // });
})


