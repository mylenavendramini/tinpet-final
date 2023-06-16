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
function getUserController(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(ctx.params.userId);
            const user = yield (0, index_1.getUser)(userId);
            ctx.body = user;
        }
        catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    });
}
function createUserController(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = ctx.request.body;
            const { id, username, email, password } = user;
            const newUser = yield (0, index_1.createUser)(user);
            ctx.body = newUser;
        }
        catch (error) {
            console.log(error);
            ctx.status = 500;
        }
    });
}
;
module.exports = { getUserController, createUserController };
