"use strict";
// import {
//   Association,
//   DataTypes,
//   HasManyGetAssociationsMixin,
//   HasManySetAssociationsMixin,
//   HasManyAddAssociationMixin,
//   InferCreationAttributes,
//   InferAttributes,
//   Model,
//   NonAttribute,
//   Sequelize,
//   CreationOptional,
// } from 'sequelize';
// import { Dog } from './Dog';
// type UserAssociations = 'dogs';
// export class User extends Model<
//   InferAttributes<User, { omit: UserAssociations }>,
//   InferCreationAttributes<User, { omit: UserAssociations }>
// > {
//   declare id: number;
//   declare username: string;
//   declare email: string;
//   declare password: string;
//   declare createdAt: CreationOptional<Date>;
//   declare updatedAt: CreationOptional<Date>;
//   // User hasMany Dog
//   declare dogs?: NonAttribute<Dog[]>;
//   declare getDogs: HasManyGetAssociationsMixin<Dog>;
//   declare setDogs: HasManySetAssociationsMixin<Dog, number>;
//   declare addDog: HasManyAddAssociationMixin<Dog, number>;
//   declare static associations: {
//     dogs: Association<User, Dog>;
//   };
//   static initModel(sequelize: Sequelize): typeof User {
//     User.init(
//       {
//         id: {
//           type: DataTypes.INTEGER,
//           primaryKey: true,
//           autoIncrement: true,
//           allowNull: false,
//         },
//         username: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           unique: true,
//         },
//         email: {
//           type: DataTypes.STRING,
//         },
//         password: {
//           type: DataTypes.STRING,
//         },
//         createdAt: {
//           type: DataTypes.DATE,
//         },
//         updatedAt: {
//           type: DataTypes.DATE,
//         },
//       },
//       {
//         sequelize,
//         modelName: 'User',
//       }
//     );
//     return User;
//   }
// }
