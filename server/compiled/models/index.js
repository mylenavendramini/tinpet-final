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
exports.login = exports.getMessages = exports.createMessage = exports.getDogMatchesArray = exports.likeAndMatch = exports.getDogsByUserId = exports.getAllDogs = exports.createDog = exports.createUser = exports.getUser = void 0;
const Message_1 = require("./Message");
const db_1 = __importDefault(require("./db"));
const User = db_1.default.User;
const Dog = db_1.default.Dog;
const MessageModel = db_1.default.Message;
function getUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const user = await User.findOne(include: [{}]{ where: { id: userId } });
            const user = yield User.findOne({
                include: [{
                        model: Dog,
                        required: true,
                        as: 'dogs',
                        where: { userId: userId },
                    }],
                where: {
                    id: userId
                }
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
                include: [{
                        model: Dog,
                        required: true,
                        as: 'dogs'
                    }],
                where: { email, password }
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
// where: { post_url: post_url },
// include: [
//    { association: 'postAuthor', attributes: ['name'] },
//    {
//       association: 'comments', attributes: ['comment'],
//       include: [{
//          association: 'commentAuthor',
//          attributes: ['name']
//       }]
//    }
// ]
// });
// model: Dog,
// required: true,
// as:'likedDogs'
// include: [{
//   model: Dog,
//   required: true,
//   as:'dogs',
//   where:{userId: userId},
// }],
function getAllDogs() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dogs = yield Dog.findAll({
                include: [{
                        model: MessageModel,
                        as: 'message'
                    }],
            });
            return dogs;
        }
        catch (error) {
            throw new Error('Unable to get all the dogs');
        }
    });
}
exports.getAllDogs = getAllDogs;
// async function getAllDogs() {
//   try {
//     const dogs = await Dog.findAll({
//       include: [
//         {association:'likedDogs'},
//         {association: 'matchedDogs'}
//       ],
//     });
//     return dogs;
//   } catch (error) {
//     throw new Error('Unable to get all the dogs');
//   }
// }
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
                liked_dog: [],
                matches_dogs: [],
            });
            // const user = await User.findOne({ where: { id: parsedId } });
            yield newDog.setUser(parsedId);
            return newDog;
        }
        catch (error) {
            throw new Error('Unable to create a dog');
        }
    });
}
exports.createDog = createDog;
function getDogsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dogs = yield Dog.findAll({
                include: [
                    { association: 'likedDogs' },
                    { association: 'matchedDogs' }
                ],
                where: { id: userId }
            });
            return dogs;
        }
        catch (error) {
            throw new Error('Unable to get all the dogs');
        }
    });
}
exports.getDogsByUserId = getDogsByUserId;
// async function getDogsByUserId(userId: number) {
//   try {
//     const user = await User.findOne({
//       where: { id: userId },
//       include: { model: Dog, as: 'dogs' },
//     });
//     if (user && user.dogs) {
//       const dogs = user.dogs;
//       return dogs;
//     } else {
//       console.log('Dogs not found');
//       return undefined;
//     }
//   } catch (error) {
//     throw new Error('Unable to get a dog');
//   }
// }
function filterDogArray(array, myDogId, theOtherDogId) {
    return __awaiter(this, void 0, void 0, function* () {
        const filteredDog = array.filter((dogId) => dogId !== theOtherDogId);
        yield Dog.update({
            liked_dog: [...filteredDog],
        }, { where: { id: myDogId } });
    });
}
function addMatch(myDogMatches, theOtherDog, myDog) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!myDog.matches_dogs.includes(Number(theOtherDog.id))) {
            const newMatch = yield Dog.update({
                matches_dogs: [...myDogMatches, Number(theOtherDog.id)],
            }, { where: { id: Number(myDog.id) } });
            return newMatch;
        }
    });
}
function addLike(myDogLikesArray, theOtherDog, myDog) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!myDog.matches_dogs.includes(Number(theOtherDog.id)) &&
            !myDog.liked_dog.includes(Number(theOtherDog.id))) {
            const likeDog = yield Dog.update({
                liked_dog: [...myDogLikesArray, Number(theOtherDog.id)],
            }, { where: { id: Number(myDog.id) } });
            return likeDog;
        }
    });
}
function likeAndMatch(myDogIdObj, theOtherDogId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedOtherDogId = Number(theOtherDogId);
            const myDog = yield Dog.findOne({ where: { id: myDogIdObj.id } });
            // const theOtherDog = await Dog.findOne({
            //   where: { id: Number(theOtherDogId) },
            // })
            yield (myDog === null || myDog === void 0 ? void 0 : myDog.addDog(parsedOtherDogId));
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
function getDogMatchesArray(dogId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dog = yield Dog.findOne({ where: { id: dogId } });
            const matches = dog === null || dog === void 0 ? void 0 : dog.matches_dogs;
            return matches;
        }
        catch (error) {
            throw new Error('Unable to get the matches');
        }
    });
}
exports.getDogMatchesArray = getDogMatchesArray;
function createMessage(body, sender_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content, receiver_id, receiver_name } = body;
        try {
            console.log(content, receiver_id, receiver_name, sender_id);
            const newMessage = yield MessageModel.create({
                content,
                receiver_id,
                receiver_name
            });
            yield newMessage.setMessage(sender_id);
            return newMessage;
        }
        catch (error) {
            throw new Error('Unable to create a message');
        }
    });
}
exports.createMessage = createMessage;
// async function createMessage(body: Message) {
//   const { content, sender_id, sender_name, receiver_id, receiver_name } = body;
//   try {
//     const newMessage = await Message.create({
//       content,
//       sender_id,
//       sender_name,
//       receiver_id,
//       receiver_name,
//     });
//     return newMessage;
//   } catch (error) {
//     throw new Error('Unable to create a message');
//   }
// }
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
