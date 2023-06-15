import {
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
  CreationOptional,
} from 'sequelize';
import { IMatches } from './Interfaces';

export class Matches extends Model<
  InferAttributes<Matches>,
  InferCreationAttributes<Matches>
> {
  declare id: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  static initModel(sequelize: Sequelize): typeof Matches {
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
      }
    );

    return Matches;
  }
}
