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
exports.likeAndMatchController = exports.createDogController = exports.getAllDogsController = void 0;
const index_1 = require("../models/index");
function getAllDogsController(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dogs = yield (0, index_1.getAllDogs)();
            ctx.body = dogs;
            ctx.status = 200;
        }
        catch (error) {
            console.log(error);
            ctx.body = { error: 'Failed to retrieve dogs' };
            ctx.status = 500;
        }
    });
}
exports.getAllDogsController = getAllDogsController;
function createDogController(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const dog = ctx.request.body;
        const user_id = ctx.params.id;
        try {
            const newDog = yield (0, index_1.createDog)(dog, user_id);
            ctx.body = newDog;
            ctx.status = 201;
            console.log(newDog, 'controller');
        }
        catch (error) {
            console.log(error);
            ctx.status = 500;
            ctx.body = { error: 'Failed to create the dog' };
        }
    });
}
exports.createDogController = createDogController;
function likeAndMatchController(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const myDogIdObj = ctx.request.body;
        const likedDogId = ctx.params.id;
        try {
            const likedDog = yield (0, index_1.likeAndMatch)(myDogIdObj, likedDogId);
            ctx.status = 200;
            ctx.body = likedDog;
        }
        catch (error) {
            console.log(error);
            ctx.status = 500;
            ctx.body = { error: 'Failed to like/match dog' };
        }
    });
}
exports.likeAndMatchController = likeAndMatchController;
