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
exports.postImageController = void 0;
const models_1 = require("../models");
const postImageController = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = ctx.params;
    const { path } = ctx.file;
    try {
        const dog = yield (0, models_1.postImage)(id);
        if (!dog) {
            ctx.status = 404;
            ctx.body = 'Dog not found';
            return;
        }
        dog.url = path;
        yield dog.save();
        ctx.status = 200;
        ctx.body = 'Image uploaded successfully';
    }
    catch (error) {
        console.error('Error uploading image:', error);
        ctx.status = 500;
    }
});
exports.postImageController = postImageController;
