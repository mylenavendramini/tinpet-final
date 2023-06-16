"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const configs = {
    development: {
        dialect: 'postgres',
        database: process.env.POSTGRES_DB_NAME || 'dog',
        username: process.env.POSTGRES_DB_USERNAME || 'postgres',
        password: process.env.POSTGRES_DB_PASSWORD || 'postgres',
        host: process.env.POSTGRES_DB_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_DB_PORT || '5432'),
    },
    test: {
        dialect: 'postgres',
        database: process.env.POSTGRES_DB_NAME || 'dog',
        username: process.env.POSTGRES_DB_USERNAME || 'postgres',
        password: process.env.POSTGRES_DB_PASSWORD || 'postgres',
        host: process.env.POSTGRES_DB_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_DB_PORT || '5432'),
    },
    production: {
        dialect: 'postgres',
        database: process.env.POSTGRES_DB_NAME,
        username: process.env.POSTGRES_DB_USERNAME,
        password: process.env.POSTGRES_DB_PASSWORD,
        host: process.env.POSTGRES_DB_HOST,
        port: parseInt(process.env.POSTGRES_DB_PORT || '5432'),
    },
};
const env = process.env.NODE_ENV || 'development';
const config = configs[env];
const db = new sequelize_1.Sequelize(Object.assign(Object.assign({}, config), { define: {
        underscored: true,
    } }));
exports.default = db;
