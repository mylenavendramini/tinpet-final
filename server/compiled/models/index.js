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
exports.postImage = exports.getMessages = exports.createMessage = exports.getDogMatchesArray = exports.putAndCheckMatch = exports.getDogsByUserId = exports.getAllDogs = exports.createDog = exports.createUser = exports.getUser = void 0;
const Dog_1 = require("./Dog");
const User_1 = require("./User");
const Messages_1 = require("./Messages");
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
            console.log(user === null || user === void 0 ? void 0 : user.dogs);
            return newDog;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createDog = createDog;
function getDogsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOne({
                where: { id: userId },
                include: { model: Dog_1.Dog, as: 'dogs' },
            });
            console.log({ user });
            console.log(user === null || user === void 0 ? void 0 : user.dogs);
            if (user && user.dogs) {
                const dogs = user.dogs;
                console.log(dogs, 'model');
                return dogs;
            }
            else {
                console.log('Dogs not found');
                return undefined;
            }
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    });
}
exports.getDogsByUserId = getDogsByUserId;
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
function createMessage(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content, sender, receiver } = body;
        try {
            const newMessage = yield Messages_1.Message.create({
                content,
                sender,
                receiver
            });
            return newMessage;
        }
        catch (e) {
            console.log('DAWG this function is simple are you that stupid not to make it work???');
        }
    });
}
exports.createMessage = createMessage;
function getMessages(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const messages = Messages_1.Message.findAll({ where: { id } });
            return messages;
        }
        catch (e) {
            console.log('Yo open your eyes Im sure you can find those messages');
        }
    });
}
exports.getMessages = getMessages;
// (async () => {
//   await db.sync();
// })();
function postImage(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dog = yield Dog_1.Dog.findByPk(id);
            return dog;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.postImage = postImage;
