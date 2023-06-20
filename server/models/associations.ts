import type { Sequelize } from 'sequelize';
import { Dog } from './Dog';
import { User } from './User';
import { Message } from './Message';

export function initModels(sequelize: Sequelize) {
  Dog.initModel(sequelize);
  User.initModel(sequelize);
  Message.initModel(sequelize);

  Dog.belongsTo(User, {});
  Dog.belongsToMany(Dog, {
    as: 'likedDogs',
    through: Dog,
    onDelete: 'CASCADE',
  });
  User.hasMany(Dog, {
    as: 'dogs',
  });

  return {
    Dog,
    User,
  };
}
