import { Sequelize, Model, DataTypes } from 'sequelize';
import { IDog } from './Interfaces';
const sequelize = new Sequelize();

class Dog extends Model<IDog> {}

Dog.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    gender: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
    },
    liked_dog: {
      type: DataTypes.ARRAY(DataTypes.INTEGER.UNSIGNED),
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Dog',
  }
);
