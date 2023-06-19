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
            const newMessage = yield (0, models_1.createMessage)(ctx.body);
            ctx.body = newMessage;
        }
        catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Its funny cause it failed...' };
        }
    });
}
exports.createMessageController = createMessageController;
function getMessagesController(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(ctx.params.id);
            const messages = (0, models_1.getMessages)(userId);
            return messages;
        }
        catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Come on man are you even trying???' };
        }
    });
}
exports.getMessagesController = getMessagesController;
