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
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import { User } from './User';

type DogAssociations = 'user' | 'dogs';

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

  // Dog belongsToMany Dog (as Matches)
  declare dogs?: NonAttribute<Dog[]>;
  declare getDogs: BelongsToManyGetAssociationsMixin<Dog>;
  declare setDogs: BelongsToManySetAssociationsMixin<Dog, number>;
  declare addDog: BelongsToManyAddAssociationMixin<Dog, number>;
  declare addDogs: BelongsToManyAddAssociationsMixin<Dog, number>;
  declare createDog: BelongsToManyCreateAssociationMixin<Dog>;
  declare removeDog: BelongsToManyRemoveAssociationMixin<Dog, number>;
  declare removeDogs: BelongsToManyRemoveAssociationsMixin<Dog, number>;
  declare hasDog: BelongsToManyHasAssociationMixin<Dog, number>;
  declare hasDogs: BelongsToManyHasAssociationsMixin<Dog, number>;
  declare countDogs: BelongsToManyCountAssociationsMixin;

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
