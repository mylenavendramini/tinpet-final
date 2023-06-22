"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dog = void 0;
const sequelize_1 = require("sequelize");
class Dog extends sequelize_1.Model {
    static initModel(sequelize) {
        Dog.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: false,
            },
            age: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            gender: {
                type: sequelize_1.DataTypes.STRING,
            },
            about: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            url: {
                type: sequelize_1.DataTypes.STRING,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
            },
        }, {
            sequelize,
            modelName: 'dog',
        });
        return Dog;
    }
}
exports.Dog = Dog;
