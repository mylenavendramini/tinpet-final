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
const index_1 = require("../models/index");
function getAllDogsController(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dogs = yield (0, index_1.getAllDogs)();
            ctx.body = dogs;
        }
        catch (error) {
            console.log(error);
            ctx.status = 500;
        }
    });
}
function createDogController(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const dog = ctx.request.body;
        try {
            const { id, name, age, gender, about, url } = dog;
            const newDog = yield (0, index_1.createDog)(dog);
        }
        catch (e) {
            console.log(e);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    });
}
function getMatchesController(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const matches = yield (0, index_1.getMatches)();
            ctx.body = matches;
        }
        catch (error) {
            console.log(error);
            ctx.status = 500;
        }
    });
}
function putLikeDogController(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const dog = ctx.request.body;
        const id = parseInt(ctx.params.id);
        try {
            const likedDog = yield (0, index_1.putLikeDog)(dog, id);
            ctx.body = likedDog;
        }
        catch (error) {
            console.log(error);
            ctx.status = 500;
        }
    });
}
module.exports = { getAllDogsController, createDogController, getMatchesController, putLikeDogController };
