import { Sequelize, Options } from 'sequelize';
import { initModels } from './associations';
import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.JEST_WORKER_ID ? 'dog_test' : 'dog';

const db = new Sequelize(
  dbName,
  'postgres',
  `${process.env.POSTGRES_DB_PASSWORD}`,
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  }
);

const { Dog, User } = initModels(db);

(async function authenticate() {
  try {
    await db.sync();

    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default { db, Dog, User };
