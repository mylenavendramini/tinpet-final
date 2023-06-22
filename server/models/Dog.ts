import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
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
import type { Message } from './Message';

type DogAssociations = 'user' | 'messages' | 'matches' | 'likes';

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
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Dog belongsTo User
  declare user?: NonAttribute<User>;
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
  declare createUser: BelongsToCreateAssociationMixin<User>;

  // Dog belongsToMany Dog (as Matches)
  declare matches?: NonAttribute<Dog[]>;
  declare getMatches: HasManyGetAssociationsMixin<Dog>;
  declare setMatches: HasManySetAssociationsMixin<Dog, number>;
  declare addMatch: HasManyAddAssociationMixin<Dog, number>;
  declare addMatches: HasManyAddAssociationsMixin<Dog, number>;
  declare createMatch: HasManyCreateAssociationMixin<Dog>;
  declare removeMatch: HasManyRemoveAssociationMixin<Dog, number>;
  declare removeMatches: HasManyRemoveAssociationsMixin<Dog, number>;
  declare hasMatch: HasManyHasAssociationMixin<Dog, number>;
  declare hasMatches: HasManyHasAssociationsMixin<Dog, number>;
  declare countMatches: HasManyCountAssociationsMixin;

  // Dog hasMany Dog (as Likes)
  declare likes?: NonAttribute<Dog[]>;
  declare getLikes: HasManyGetAssociationsMixin<Dog>;
  declare setLikes: HasManySetAssociationsMixin<Dog, number>;
  declare addLike: HasManyAddAssociationMixin<Dog, number>;
  declare addLikes: HasManyAddAssociationsMixin<Dog, number>;
  declare createLike: HasManyCreateAssociationMixin<Dog>;
  declare removeLike: HasManyRemoveAssociationMixin<Dog, number>;
  declare removeLikes: HasManyRemoveAssociationsMixin<Dog, number>;
  declare hasLike: HasManyHasAssociationMixin<Dog, number>;
  declare hasLikes: HasManyHasAssociationsMixin<Dog, number>;
  declare countLikes: HasManyCountAssociationsMixin;

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
    likes: Association<Dog, Dog>;
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
