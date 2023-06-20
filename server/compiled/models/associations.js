"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = void 0;
const Dog_1 = require("./Dog");
const User_1 = require("./User");
const Message_1 = require("./Message");
function initModels(sequelize) {
    Dog_1.Dog.initModel(sequelize);
    User_1.User.initModel(sequelize);
    Message_1.Message.initModel(sequelize);
    Dog_1.Dog.belongsTo(User_1.User, {});
    Dog_1.Dog.belongsToMany(Dog_1.Dog, {
        as: 'likedDogs',
        through: Dog_1.Dog,
        onDelete: 'CASCADE',
    });
    User_1.User.hasMany(Dog_1.Dog, {
        as: 'dogs',
    });
    return {
        Dog: Dog_1.Dog,
        User: User_1.User,
    };
}
exports.initModels = initModels;
