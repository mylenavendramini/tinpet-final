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
                unique: false,
            },
            receiver_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            receiver_name: {
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
// import {
//   Association,
//   BelongsToGetAssociationMixin,
//   BelongsToSetAssociationMixin,
//   BelongsToCreateAssociationMixin,
//   CreationOptional,
//   DataTypes,
//   InferCreationAttributes,
//   InferAttributes,
//   Model,
//   NonAttribute,
//   Sequelize
// } from 'sequelize'
// import { Dog } from './Dog'
// type MessageAssociations = 'message'
// export class Message extends Model<
// InferAttributes<Message, {omit: MessageAssociations}>,
// InferCreationAttributes<Message, {omit: MessageAssociations}>
// > {
//   declare id?: CreationOptional<number>
//   declare content: string
//   declare sender_id: number
//   declare receiver_id: number
//   declare sender_name: string
//   declare receiver_name: string
//   declare createdAt: CreationOptional<Date>
//   declare updatedAt: CreationOptional<Date>
//   // Message belongsTo Dog (as Message)
//   declare message?: NonAttribute<Dog>
//   declare getMessage: BelongsToGetAssociationMixin<Dog>
//   declare setMessage: BelongsToSetAssociationMixin<Dog, number>
//   declare createMessage: BelongsToCreateAssociationMixin<Dog>
//   static initModel(sequelize: Sequelize): typeof Message {
//     Message.init({
//       id: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false
//       },
//       content: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: false,
//       },
//       sender_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//       },
//       receiver_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//       },
//       sender_name: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       receiver_name: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       createdAt: {
//         type: DataTypes.DATE
//       },
//       updatedAt: {
//         type: DataTypes.DATE
//       }
//     }, {
//       sequelize
//     })
//     return Message
//   }
// }
