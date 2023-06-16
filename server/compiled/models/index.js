"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatches = exports.putLikeDog = exports.createDog = exports.getAllDogs = exports.createUser = exports.getUser = void 0;
const Dog_1 = require("./Dog");
const Matches_1 = require("./Matches");
const User_1 = require("./User");
function getUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOne({ where: { id: userId } });
            return user;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getUser = getUser;
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(typeof User_1.User);
        try {
            const { id, username, email, password } = user;
            console.log(id, username, email, password);
            const newUser = (yield User_1.User.create({
                id,
                username,
                email,
                password,
                createdAt: new Date(),
                updatedAt: new Date(),
            }));
            console.log(newUser);
            return newUser;
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw new Error('User creation failed.');
        }
    });
}
exports.createUser = createUser;
function getAllDogs() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dogs = yield Dog_1.Dog.findAll();
            return dogs;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getAllDogs = getAllDogs;
function createDog(dog) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, name, age, gender, about, url } = dog;
            const newDog = yield Dog_1.Dog.create({
                id,
                name,
                age,
                gender,
                about,
                url,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return newDog;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createDog = createDog;
function putLikeDog(dog, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const likedDog = dog.liked_dog;
            const likeDog = yield Dog_1.Dog.update({
                liked_dog: [...likedDog, id],
            }, { where: { id: dog.id } });
            return likeDog;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.putLikeDog = putLikeDog;
function getMatches() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const matches = yield Matches_1.Matches.findAll();
            return matches;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getMatches = getMatches;
