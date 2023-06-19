"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_1 = require("sequelize");
class Message extends sequelize_1.Model {
    static initModel(sequelize) {
        Message.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            content: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            sender: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            receiver: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE
            }
        }, {
            sequelize
        });
        return Message;
    }
}
exports.Message = Message;
