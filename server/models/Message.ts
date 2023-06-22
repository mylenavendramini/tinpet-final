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
<<<<<<< HEAD
  Sequelize,
} from 'sequelize';
=======
  NonAttribute,
  Sequelize
} from 'sequelize'
import { Dog } from './Dog'

type MessageAssociations = 'message'
>>>>>>> b7075b10e8592b04261dd4a402bfcf1789356593

export class Message extends Model<
InferAttributes<Message, {omit: MessageAssociations}>,
InferCreationAttributes<Message, {omit: MessageAssociations}>
> {
<<<<<<< HEAD
  declare id?: CreationOptional<number>;
  declare content: string;
  declare sender_id: number;
  declare receiver_id: number;
  declare sender_name: string;
  declare receiver_name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
=======
  declare id?: CreationOptional<number>
  declare content: string
  declare receiver_id: number
  declare receiver_name: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
>>>>>>> b7075b10e8592b04261dd4a402bfcf1789356593


  // Message belongsTo Dog (as Message)
  declare message?: NonAttribute<Dog>
  declare getMessage: BelongsToGetAssociationMixin<Dog>
  declare setMessage: BelongsToSetAssociationMixin<Dog, number>
  declare createMessage: BelongsToCreateAssociationMixin<Dog>

  declare static associations: {
    message: Association<Message, Dog>
  }

  static initModel(sequelize: Sequelize): typeof Message {
    Message.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
        },
        sender_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        receiver_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        sender_name: {
          type: DataTypes.STRING,
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
<<<<<<< HEAD
      {
        sequelize,
=======
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      receiver_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
>>>>>>> b7075b10e8592b04261dd4a402bfcf1789356593
      }
    );

    return Message;
  }
}
<<<<<<< HEAD
=======

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
>>>>>>> b7075b10e8592b04261dd4a402bfcf1789356593
