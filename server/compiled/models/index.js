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
exports.getDogMatchesArray = exports.putAndCheckMatch = exports.getAllDogs = exports.createDog = exports.createUser = exports.getUser = void 0;
const Dog_1 = require("./Dog");
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
        try {
            const { username, email, password } = user;
            const newUser = (yield User_1.User.create({
                username,
                email,
                password,
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
                matches_dogs: [],
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
function filterDogArray(array, myDogId, theOtherDogId) {
    return __awaiter(this, void 0, void 0, function* () {
        const filteredDog = array.filter((el) => el !== theOtherDogId);
        yield Dog_1.Dog.update({
            liked_dog: [...filteredDog],
        }, { where: { id: myDogId } });
    });
}
function putAndCheckMatch(myDogIdObj, theOtherDogId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('before the try');
        try {
            console.log('inside the try');
            console.log(myDogIdObj);
            const myDog = yield Dog_1.Dog.findOne({ where: myDogIdObj });
            const theOtherDog = yield Dog_1.Dog.findOne({
                where: { id: Number(theOtherDogId) },
            });
            console.log({ myDog });
            const myDogArray = myDog === null || myDog === void 0 ? void 0 : myDog.liked_dog;
            const theOtherDogArray = theOtherDog === null || theOtherDog === void 0 ? void 0 : theOtherDog.liked_dog;
            const myDogMatches = myDog === null || myDog === void 0 ? void 0 : myDog.matches_dogs;
            const theOtherDogMatches = theOtherDog === null || theOtherDog === void 0 ? void 0 : theOtherDog.matches_dogs;
            // Check if it's a match and add to matches_dogs:
            if (theOtherDogArray.includes(myDog === null || myDog === void 0 ? void 0 : myDog.id)) {
                const newMatch = yield Dog_1.Dog.update({
                    matches_dogs: [...myDogMatches, Number(theOtherDogId)],
                }, { where: myDogIdObj });
                yield Dog_1.Dog.update({
                    matches_dogs: [...theOtherDogMatches, Number(myDog.id)],
                }, { where: { id: theOtherDogId } });
                filterDogArray(myDogArray, myDog === null || myDog === void 0 ? void 0 : myDog.id, theOtherDogId);
                filterDogArray(theOtherDogArray, theOtherDogId, myDog === null || myDog === void 0 ? void 0 : myDog.id);
                return newMatch;
            }
            // Add the dog that my dog like:
            if (!myDogArray.includes(theOtherDogId)) {
                const likeDog = yield Dog_1.Dog.update({
                    liked_dog: [...myDogArray, Number(theOtherDogId)],
                }, { where: myDogIdObj });
                return likeDog;
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.putAndCheckMatch = putAndCheckMatch;
function getDogMatchesArray(dogId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dog = yield Dog_1.Dog.findOne({ where: { id: dogId } });
            const matches = dog === null || dog === void 0 ? void 0 : dog.matches_dogs;
            return matches;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getDogMatchesArray = getDogMatchesArray;
