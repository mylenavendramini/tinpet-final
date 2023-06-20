
const { describe, expect, test } = require('@jest/globals')
const { MockUser, MockDog } = require('./mocks');
const { createUserController, getUserController, loginController } = require('../compiled/controllers/user')
const { createDogController, getDogsOfUser, getAllDogMatches, getAllDogsController, putLikeDogController } = require('../compiled/controllers/dog')
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

router.get('/', (ctx) => {
  ctx.body = 'Hello World';
});

router.post('/hello', async (ctx) => {
  const user = ctx.request.body;
  ctx.body = user;
});
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



router.get('/dogs/1', (ctx) => {
  ctx.body = 'Hello World';
});


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
  test('Create dog', async () => {
    const mock = MockDog;
    const response = await supertest(app.callback())
      .post('/dogs/1',)
      .send(mock);
    expect(response.statusCode).toEqual(201);
    expect(response.body.name).toEqual('Lily');
    expect(typeof response.body.id).toEqual('number');
  });

  test('Get all dogs', async () => {
    const response = await supertest(app.callback())
      .get('/dogs');
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].name).toEqual(MockDog.name);
  });

  test('Get dog by user id', async () => {
    const response = await supertest(app.callback())
      .get('/dogs/1');
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].name).toEqual(MockDog.name);
  });

  test('Get all matches', async () => {
    const response = await supertest(app.callback())
      .get('/dogs/1');
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].matches_dogs).toEqual([]);
  });
})

describe('Hello World', () => {
  test('Get Hello world works', async () => {
    const response = await supertest(app.callback()).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World');
  });

  test('Create Hello world works', async () => {
    const title = 'Hello World';
    const response = await supertest(app.callback())
      .post('/hello',)
      .send({ title });
    expect(JSON.parse(response.text).title).toBe(title);

  });
})



// test('Create user works', async () => {
//   const title = {
//     id: 1,
//     username: 'Mike',
//     email: 'mike@example.com',
//     password: 'mockpassword'
//   };
//   const response = await supertest(app.callback())
//     .post('/user',)
//     .send(title);
//   expect(response.body.username).toEqual('Mike');
// });



// describe('POST /user', function () {
//   it('user.name should return "mike"', async () => {
//     const response = await supertest(app.callback())
//       .post('/user')
//       .send({
//         username: 'Mike',
//         email: 'mike@example.com',
//         password: 'mockpassword'
//       });
//     expect(response.status).toBe(201);
//     expect(response.body).toBe({
//       id: 1,
//       username: 'Mike',
//       email: 'mike@example.com',
//       password: 'mockpassword'
//     });
//   });
// });


// describe('get user', () => {
//   it('should return the user', async () => {
//     // const response = await request(server)
//     const response = await supertest(server)
//       // const response = await request('http://localhost:3001')
//       .get('/user/1')
//     // .set('Accept', 'application/json')
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