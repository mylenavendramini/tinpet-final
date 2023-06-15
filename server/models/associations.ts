import type { Sequelize, Model } from 'sequelize';
import { Dog } from './Dog';
import { User } from './User';
import { Matches } from './Matches';

export function initModels(sequelize: Sequelize) {
  Dog.initModel(sequelize);
  User.initModel(sequelize);
  Matches.initModel(sequelize);

  Dog.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  });
  Dog.belongsToMany(Dog, {
    as: 'matches',
    through: Matches,
    foreignKey: 'dog_id',
    otherKey: 'matches_id',
    onDelete: 'CASCADE',
  });
  User.hasMany(Dog, {
    as: 'dogs',
    foreignKey: 'user_id',
  });

  return {
    Dog,
    User,
    Matches,
  };
}
