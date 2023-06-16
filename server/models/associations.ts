import type { Sequelize, Model } from 'sequelize';
import { Dog } from './Dog';
import { User } from './User';
import { Matches } from './Matches';

export function initModels(sequelize: Sequelize) {
  Dog.initModel(sequelize);
  User.initModel(sequelize);
  Matches.initModel(sequelize);

  // User.hasMany(Dog);
  Dog.belongsTo(User, {
    as: 'user',
    foreignKey: 'id',
  });
  Dog.belongsToMany(Dog, {
    as: 'matches',
    through: Matches,
    foreignKey: 'id',
    otherKey: 'matches_id',
    onDelete: 'CASCADE',
  });
  User.hasMany(Dog, {
    as: 'dogs',
    foreignKey: 'id',
  });

  return {
    Dog,
    User,
    Matches,
  };
}
