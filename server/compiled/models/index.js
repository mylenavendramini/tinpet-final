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
const db_1 = __importDefault(require("./db"));
const User = db_1.default.User;
const Dog = db_1.default.Dog;
const Message = db_1.default.Message;
// async function getUser(userId: number) {
//   console.log(userId);
//   try {
//     const user = await User.findOne({
//       include: [
//         {
//           required: false,
//           model: Dog,
//           as: 'dogs',
//           where: { userId: userId },
//         },
//       ],
//       where: {
//         id: userId,
//       },
//     });
//     console.log(user, ' Should console log user here');
//     return user;
//   } catch (error) {
//     throw new Error('Unable to get the user');
//   }
// }
// async function login(body: IUser) {
//   try {
//     const { email, password } = body;
//     const user = await User.findOne({ where: { email, password } });
//     return user;
//   } catch (error) {
//     throw new Error('Unable to login');
//   }
// }
function getUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User.findOne({
                include: [
                    {
                        model: Dog,
                        required: false,
                        as: 'dogs',
                        where: { userId: userId },
                        include: [{ model: Message, as: 'messages' }],
                    },
                ],
                where: {
                    id: userId,
                },
            });
            console.log(user);
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
                        required: false,
                        as: 'dogs',
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
                include: [{ model: Message, as: 'messages' }],
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
                liked_dog: [],
                matches_dogs: [],
            });
            const user = yield User.findOne({ where: { id: parsedId } });
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
            const user = yield User.findOne({
                where: { id: userId },
                include: { model: Dog, as: 'dogs' },
            });
            if (user && user.dogs) {
                const dogs = user.dogs;
                return dogs;
            }
            else {
                console.log('Dogs not found');
                return undefined;
            }
        }
        catch (error) {
            throw new Error('Unable to get a dog');
        }
    });
}
exports.getDogsByUserId = getDogsByUserId;
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
            const myDog = (yield Dog.findOne({ where: { id: myDogIdObj.id } }));
            const theOtherDog = (yield Dog.findOne({
                where: { id: Number(theOtherDogId) },
            }));
            const myDogLikesArray = myDog === null || myDog === void 0 ? void 0 : myDog.liked_dog;
            const theOtherDogLikesArray = theOtherDog === null || theOtherDog === void 0 ? void 0 : theOtherDog.liked_dog;
            const myDogMatches = myDog === null || myDog === void 0 ? void 0 : myDog.matches_dogs;
            const theOtherDogMatches = theOtherDog === null || theOtherDog === void 0 ? void 0 : theOtherDog.matches_dogs;
            // Check if it's a match and add to matches_dogs:
            if (theOtherDogLikesArray.includes(myDog === null || myDog === void 0 ? void 0 : myDog.id)) {
                addMatch(myDogMatches, theOtherDog, myDog);
                addMatch(theOtherDogMatches, myDog, theOtherDog);
                filterDogArray(myDogLikesArray, myDog === null || myDog === void 0 ? void 0 : myDog.id, theOtherDogId);
                filterDogArray(theOtherDogLikesArray, theOtherDogId, myDog === null || myDog === void 0 ? void 0 : myDog.id);
                return myDog;
            }
            // Add the dog that my dog like:
            if (!myDogLikesArray.includes(theOtherDogId)) {
                addLike(myDogLikesArray, theOtherDog, myDog);
                return myDog;
            }
        }
        catch (error) {
            throw new Error('Unable to like a dog');
        }
    });
}
exports.likeAndMatch = likeAndMatch;
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
            const sender = yield Dog.findOne({ where: { id: sender_id } });
            const newMessage = yield Message.create({
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
            const messages = yield Message.findAll();
            return messages;
        }
        catch (error) {
            console.log(error);
            throw new Error('Unable to get a message');
        }
    });
}
exports.getMessages = getMessages;
