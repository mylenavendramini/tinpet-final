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
exports.getMessagesController = exports.createMessageController = void 0;
const models_1 = require("../models");
function createMessageController(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newMessage = yield (0, models_1.createMessage)(ctx.request.body);
            ctx.body = newMessage;
            ctx.status = 201;
        }
        catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Failed to create message' };
        }
    });
}
exports.createMessageController = createMessageController;
function getMessagesController(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const messages = yield (0, models_1.getMessages)();
            ctx.body = messages;
            ctx.status = 200;
        }
        catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Failed to get messages' };
        }
    });
}
exports.getMessagesController = getMessagesController;
