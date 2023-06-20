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
exports.loginController = exports.createUserController = exports.getUserController = void 0;
const index_1 = require("../models/index");
function getUserController(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(ctx.params.id);
            const user = yield (0, index_1.getUser)(userId);
            ctx.body = user;
            ctx.status = 200;
        }
        catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    });
}
exports.getUserController = getUserController;
function createUserController(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = ctx.request.body;
            const newUser = yield (0, index_1.createUser)(user);
            ctx.body = newUser;
            ctx.status = 201;
        }
        catch (error) {
            console.log(error);
            ctx.status = 500;
        }
    });
}
exports.createUserController = createUserController;
function loginController(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = ctx.request.body;
            const res = yield (0, index_1.login)(user);
            ctx.body = res;
            ctx.status = 200;
        }
        catch (error) {
            ctx.status = 500;
            ctx.body = JSON.stringify('Unable to find user');
        }
    });
}
exports.loginController = loginController;
