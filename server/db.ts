import { Sequelize, Options } from 'sequelize';
import configs from './config.js';

const env = process.env.NODE_ENV || 'development';
const config = (configs as { [key: string]: Options })[env];

const db: Sequelize = new Sequelize({
  ...config,
  define: {
    underscored: true,
  },
});

export default db;
