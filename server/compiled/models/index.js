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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatches = exports.putLikeDog = exports.getAllDogs = exports.createDog = exports.createUser = exports.getUser = void 0;
const Dog_1 = require("./Dog");
const Matches_1 = require("./Matches");
const User_1 = require("./User");
const db_1 = __importDefault(require("./db"));
function getUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log({ userId });
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
        try {
            const { id, username, email, password } = user;
            const newUser = (yield User_1.User.create({
                id,
                username,
                email,
                password,
                createdAt: new Date(),
                updatedAt: new Date(),
            }));
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
function createDog(dog, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, name, age, gender, about, url } = dog;
            const user_id = Number(userId);
            const newDog = yield Dog_1.Dog.create({
                id,
                name,
                age,
                gender,
                about,
                url,
                liked_dog: [],
            });
            const user = yield User_1.User.findOne({ where: { id: user_id } });
            user === null || user === void 0 ? void 0 : user.addDog(newDog);
            console.log(newDog, 'model');
            return newDog;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createDog = createDog;
function putLikeDog(myDogIdObj, likedDogId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('before the try');
        try {
            console.log('inside the try');
            console.log(myDogIdObj);
            const dog = yield Dog_1.Dog.findOne({ where: myDogIdObj });
            console.log({ dog });
            const likedDog = dog === null || dog === void 0 ? void 0 : dog.liked_dog;
            console.log({ likedDog });
            console.log({ likedDogId });
            // TODO:
            // if the id coming from the likedDogId already exists, we don't pass to it
            //if (!likedDog.includes(likedDogId) {})
            const likeDog = yield Dog_1.Dog.update({
                liked_dog: [...likedDog, Number(likedDogId)],
            }, { where: myDogIdObj });
            console.log({ likeDog });
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.sync();
}))();
