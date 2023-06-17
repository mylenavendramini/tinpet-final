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
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const cors_1 = __importDefault(require("@koa/cors"));
const router_1 = __importDefault(require("./routers/router"));
const db_1 = __importDefault(require("./models/db"));
const app = new koa_1.default();
const PORT = 3001;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.sync();
}))();
app
    .use((0, cors_1.default)())
    .use((0, koa_bodyparser_1.default)())
    .use(router_1.default.routes())
    .use(router_1.default.allowedMethods());
app.listen(PORT, () => console.log(`App is now running from the cops ${PORT} meters ahead of them`));
