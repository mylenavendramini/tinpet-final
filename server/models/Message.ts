import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import { Dog } from './Dog';
type MessageAssociations = 'message';
export class Message extends Model<
  InferAttributes<Message, { omit: MessageAssociations }>,
  InferCreationAttributes<Message, { omit: MessageAssociations }>
> {
  declare id?: CreationOptional<number>;
  declare content: string;
  declare receiver_id: number;
  declare receiver_name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  // Message belongsTo Dog (as Message)
  declare message?: NonAttribute<Dog>;
  declare getMessage: BelongsToGetAssociationMixin<Dog>;
  declare setMessage: BelongsToSetAssociationMixin<Dog, number>;
  declare createMessage: BelongsToCreateAssociationMixin<Dog>;
  declare static associations: {
    message: Association<Message, Dog>;
  };
  static initModel(sequelize: Sequelize): typeof Message {
    Message.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
        },
        receiver_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        receiver_name: {
          type: DataTypes.STRING,
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
    return Message;
  }
}
