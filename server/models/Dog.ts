import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
  CreationOptional,
} from 'sequelize';
import { IDog } from './Interfaces';
import { User } from './User';

type DogAssociations = 'user' | 'matches' | undefined;

export class Dog extends Model<
  InferAttributes<Dog, { omit: DogAssociations }>,
  InferCreationAttributes<Dog, { omit: DogAssociations }>
> {
  // declare dog: IDog;
  declare id: number;
  declare name: string;
  declare age: number | null;
  declare gender: string | null;
  declare about: string;
  declare url: string | null;
  declare liked_dog: string[] | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  // Dog belongsTo User
  declare user?: NonAttribute<User>;
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
  declare createUser: BelongsToCreateAssociationMixin<User>;

  // Dog belongsToMany Dog (as Matches)
  declare matches?: NonAttribute<Dog[]>;
  declare getMatches: BelongsToManyGetAssociationsMixin<Dog>;
  declare setMatches: BelongsToManySetAssociationsMixin<Dog, number>;
  declare addMatch: BelongsToManyAddAssociationMixin<Dog, number>;

  declare static associations: {
    user: Association<Dog, User>;
    matches: Association<Dog, Dog>;
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

    return Dog;
  }
}
