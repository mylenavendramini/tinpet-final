"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = void 0;
const Dog_1 = require("./Dog");
const User_1 = require("./User");
const Matches_1 = require("./Matches");
function initModels(sequelize) {
    Dog_1.Dog.initModel(sequelize);
    User_1.User.initModel(sequelize);
    Matches_1.Matches.initModel(sequelize);
    Dog_1.Dog.belongsTo(User_1.User, {
        as: 'user',
        foreignKey: 'id',
    });
    Dog_1.Dog.belongsToMany(Dog_1.Dog, {
        as: 'dog',
        through: Dog_1.Dog,
        foreignKey: 'id',
        otherKey: 'id',
        onDelete: 'CASCADE',
    });
    User_1.User.hasMany(Dog_1.Dog, {
        as: 'dogs',
        foreignKey: 'id',
    });
    return {
        Dog: Dog_1.Dog,
        User: User_1.User,
        Matches: Matches_1.Matches,
    };
}
exports.initModels = initModels;
