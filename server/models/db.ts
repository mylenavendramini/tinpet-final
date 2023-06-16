import { Sequelize, Options } from 'sequelize';
import { initModels } from './associations';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(
  'dog',
  'postgres',
  `${process.env.POSTGRES_DB_PASSWORD}`,
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  }
);

(async function authenticate() {
  try {
    initModels(db);
    await db.sync();
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default db;
