"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matches = void 0;
const sequelize_1 = require("sequelize");
class Matches extends sequelize_1.Model {
    static initModel(sequelize) {
        Matches.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
            },
        }, {
            sequelize,
        });
        return Matches;
    }
}
exports.Matches = Matches;
