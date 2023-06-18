
import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize
} from 'sequelize'

export class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  declare id?: CreationOptional<number>
  declare content: string
  declare sender: number
  declare reciever: number
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  
  static initModel(sequelize: Sequelize): typeof Message {
    Message.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      sender: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      reciever: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize
    })
    
    return Message
  }
}