import type { Sequelize } from 'sequelize';
import { Dog } from './Dog';
import { User } from './User';

export function initModels(sequelize: Sequelize) {
  Dog.initModel(sequelize);
  User.initModel(sequelize);

  Dog.belongsTo(User, {
    as: 'user',
    foreignKey: 'id',
  });
  Dog.belongsToMany(Dog, {
    as: 'dog',
    through: Dog,
    foreignKey: 'id',
    otherKey: 'id',
    onDelete: 'CASCADE',
  });
  User.hasMany(Dog, {
    as: 'dogs',
    foreignKey: 'id',
  });

  return {
    Dog,
    User,
  };
}
