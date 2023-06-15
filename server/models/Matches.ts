import { Sequelize, Model, DataTypes } from 'sequelize';
import { IMatches } from './Interfaces';
const sequelize = new Sequelize();

class Matches extends Model<IMatches> {}

Matches.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    modelName: 'Matches',
  }
);
