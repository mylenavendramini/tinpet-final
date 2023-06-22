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
exports.login = exports.getMessages = exports.createMessage = exports.likeAndMatch = exports.getAllDogs = exports.createDog = exports.createUser = exports.getUser = void 0;
const Message_1 = require("./Message");
const db_1 = __importDefault(require("./db"));
const User = db_1.default.User;
const Dog = db_1.default.Dog;
const MessageModel = db_1.default.Message;
function getUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User.findOne({
                include: [
                    {
                        model: Dog,
                        required: true,
                        as: 'dogs',
                        where: { userId: userId },
                        include: [
                            { model: Dog, as: 'matches' },
                            { model: MessageModel, as: 'messages' },
                        ],
                    },
                ],
                where: {
                    id: userId,
                },
            });
            return user;
        }
        catch (error) {
            throw new Error('Unable to get the user');
        }
    });
}
exports.getUser = getUser;
function login(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = body;
            const user = yield User.findOne({
                include: [
                    {
                        model: Dog,
                        required: true,
                        as: 'dogs',
                        include: [
                            { model: Dog, as: 'matches' },
                            { model: MessageModel, as: 'messages' },
                        ],
                    },
                ],
                where: { email, password },
            });
            return user;
        }
        catch (error) {
            throw new Error('Unable to login');
        }
    });
}
exports.login = login;
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password } = user;
            const newUser = yield User.create({
                username,
                email,
                password,
            });
            return newUser;
        }
        catch (error) {
            throw new Error('User creation failed.');
        }
    });
}
exports.createUser = createUser;
function getAllDogs() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dogs = yield Dog.findAll({
                include: [
                    { model: Dog, as: 'matches' },
                    { model: MessageModel, as: 'messages' },
                ],
            });
            return dogs;
        }
        catch (error) {
            throw new Error('Unable to get all the dogs');
        }
    });
}
exports.getAllDogs = getAllDogs;
function createDog(dog, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, age, gender, about, url } = dog;
            const parsedId = Number(userId);
            const newDog = yield Dog.create({
                name,
                age,
                gender,
                about,
                url,
            });
            yield newDog.setUser(parsedId);
            return newDog;
        }
        catch (error) {
            throw new Error('Unable to create a dog');
        }
    });
}
exports.createDog = createDog;
// async function filterDogArray(
//   array: number[],
//   myDogId: number,
//   theOtherDogId: number
// ) {
//   const filteredDog = array.filter((dogId) => dogId !== theOtherDogId);
//   await Dog.update(
//     {
//       liked_dog: [...filteredDog],
//     },
//     { where: { id: myDogId } }
//   );
// }
// async function addMatch(
//   myDogMatches: number[],
//   theOtherDog: IDog,
//   myDog: IDog
// ) {
//   if (!myDog.matches_dogs.includes(Number(theOtherDog.id))) {
//     const newMatch = await Dog.update(
//       {
//         matches_dogs: [...myDogMatches, Number(theOtherDog.id)],
//       },
//       { where: { id: Number(myDog.id) } }
//     );
//     return newMatch;
//   }
// }
// async function addLike(
//   myDogLikesArray: number[],
//   theOtherDog: IDog,
//   myDog: IDog
// ) {
//   if (
//     !myDog.matches_dogs.includes(Number(theOtherDog.id)) &&
//     !myDog.liked_dog.includes(Number(theOtherDog.id))
//   ) {
//     const likeDog = await Dog.update(
//       {
//         liked_dog: [...myDogLikesArray, Number(theOtherDog.id)],
//       },
//       { where: { id: Number(myDog.id) } }
//     );
//     return likeDog;
//   }
// }
function likeAndMatch(myDogIdObj, theOtherDogId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedOtherDogId = Number(theOtherDogId);
            const parsedMyDogId = Number(myDogIdObj.id);
            const myDog = yield Dog.findOne({ where: { id: myDogIdObj.id } });
            const otherDog = yield Dog.findOne({ where: { id: theOtherDogId } });
            const likesMyDog = yield (otherDog === null || otherDog === void 0 ? void 0 : otherDog.hasLike(parsedMyDogId));
            const hasLike = yield (myDog === null || myDog === void 0 ? void 0 : myDog.hasLike(parsedOtherDogId));
            const matched = yield (otherDog === null || otherDog === void 0 ? void 0 : otherDog.hasMatch(parsedMyDogId));
            if (!hasLike && !likesMyDog && !matched) {
                console.log('HEREEEE');
                yield (myDog === null || myDog === void 0 ? void 0 : myDog.addLike(parsedOtherDogId));
            }
            else if (likesMyDog) {
                yield (otherDog === null || otherDog === void 0 ? void 0 : otherDog.addMatch(parsedMyDogId));
                yield (myDog === null || myDog === void 0 ? void 0 : myDog.addMatch(parsedOtherDogId));
                yield (otherDog === null || otherDog === void 0 ? void 0 : otherDog.removeLike(parsedMyDogId));
            }
            return myDog;
        }
        catch (error) {
            throw new Error('Unable to like a dog');
        }
    });
}
exports.likeAndMatch = likeAndMatch;
// const user = await User.findOne({ where: { id: parsedId } });
// await newDog.setUser(parsedId);
// async function likeAndMatch(myDogIdObj: IdObject, theOtherDogId: number) {
//   try {
//     const myDog = (await Dog.findOne({ where: { id: myDogIdObj.id } })) as IDog;
//     const theOtherDog = (await Dog.findOne({
//       where: { id: Number(theOtherDogId) },
//     })) as IDog;
//     const myDogLikesArray = myDog?.liked_dog as number[];
//     const theOtherDogLikesArray = theOtherDog?.liked_dog as number[];
//     const myDogMatches = myDog?.matches_dogs as number[];
//     const theOtherDogMatches = theOtherDog?.matches_dogs as number[];
//     // Check if it's a match and add to matches_dogs:
//     if (theOtherDogLikesArray.includes(myDog?.id as number)) {
//       addMatch(myDogMatches, theOtherDog, myDog);
//       addMatch(theOtherDogMatches, myDog, theOtherDog);
//       filterDogArray(myDogLikesArray, myDog?.id as number, theOtherDogId);
//       filterDogArray(theOtherDogLikesArray, theOtherDogId, myDog?.id as number);
//       return myDog;
//     }
//     // Add the dog that my dog like:
//     if (!myDogLikesArray.includes(theOtherDogId)) {
//       addLike(myDogLikesArray, theOtherDog, myDog);
//       return myDog;
//     }
//   } catch (error) {
//     throw new Error('Unable to like a dog');
//   }
// }
// async function getDogMatchesArray(dogId: number) {
//   try {
//     const dog = await Dog.findOne({ where: { id: dogId } });
//     const matches = dog?.matches;
//     return matches;
//   } catch (error) {
//     throw new Error('Unable to get the matches');
//   }
// }
function createMessage(body, sender_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content, receiver_id, receiver_name } = body;
        try {
            const sender = yield Dog.findOne({ where: { id: sender_id } });
            const newMessage = yield MessageModel.create({
                content,
                receiver_id,
                receiver_name,
            });
            sender === null || sender === void 0 ? void 0 : sender.addMessage(newMessage);
            return newMessage;
        }
        catch (error) {
            throw new Error('Unable to create a message');
        }
    });
}
exports.createMessage = createMessage;
function getMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const messages = yield Message_1.Message.findAll();
            return messages;
        }
        catch (error) {
            console.log(error);
            throw new Error('Unable to get a message');
        }
    });
}
exports.getMessages = getMessages;
