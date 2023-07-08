import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import { User } from './User';
import { Message } from './Message';

type DogAssociations = 'user' | 'messages';

export class Dog extends Model<
  InferAttributes<Dog, { omit: DogAssociations }>,
  InferCreationAttributes<Dog, { omit: DogAssociations }>
> {
  // declare dog: IDog;
  declare id?: number;
  declare name: string;
  declare age: number | null;
  declare gender: string | null;
  declare about: string;
  declare url: string | null;
  declare liked_dog: number[];
  declare matches_dogs: number[];
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Dog belongsTo User
  declare user?: NonAttribute<User>;
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
  declare createUser: BelongsToCreateAssociationMixin<User>;

  // Dog hasMany Message
  declare messages?: NonAttribute<Message[]>;
  declare getMessages: HasManyGetAssociationsMixin<Message>;
  declare setMessages: HasManySetAssociationsMixin<Message, number>;
  declare addMessage: HasManyAddAssociationMixin<Message, number>;
  declare addMessages: HasManyAddAssociationsMixin<Message, number>;
  declare createMessage: HasManyCreateAssociationMixin<Message>;
  declare removeMessage: HasManyRemoveAssociationMixin<Message, number>;
  declare removeMessages: HasManyRemoveAssociationsMixin<Message, number>;
  declare hasMessage: HasManyHasAssociationMixin<Message, number>;
  declare hasMessages: HasManyHasAssociationsMixin<Message, number>;
  declare countMessages: HasManyCountAssociationsMixin;

  declare static associations: {
    user: Association<Dog, User>;
    matches: Association<Dog, Dog>;
    messages: Association<Dog, Message>;
  };

  static initModel(sequelize: Sequelize): typeof Dog {
    Dog.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
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
          type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        matches_dogs: {
          type: DataTypes.ARRAY(DataTypes.INTEGER),
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
        modelName: 'dog',
      }
    );

    return Dog;
  }
}
