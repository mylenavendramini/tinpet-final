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
    as: 'matchedDogs',
    through: 'Matches',
    onDelete: 'CASCADE',
    foreignKey: "id"
  });
  User.hasMany(Dog, {
    as: 'dogs',
  });
  Dog.hasMany(Message, {
    as: 'messages',
    foreignKey: 'dog_id'
  })
  Message.belongsTo(Dog, {
    as: 'message',
    foreignKey: 'message_id'
  })

  return {
    Dog,
    User,
    Message
  };
}
