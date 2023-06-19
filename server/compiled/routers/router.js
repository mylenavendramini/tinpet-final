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
const koa_router_1 = __importDefault(require("koa-router"));
const user_1 = require("../controllers/user");
const dog_1 = require("../controllers/dog");
const messages_1 = require("../controllers/messages");
const images_1 = require("../controllers/images");
const multer_1 = __importDefault(require("multer"));
const router = new koa_router_1.default();
const upload = (0, multer_1.default)({ dest: "../../frontend/public/uploads/" });
const uploadMiddleware = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise((resolve, reject) => {
        upload.single('image')(ctx.req, ctx.res, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
    yield next();
});
router.post('/user', user_1.createUserController);
router.post('/dogs/:id', dog_1.createDogController);
router.post('/login', user_1.loginController);
router.post('/messages/:id', messages_1.createMessageController);
router.get('/messages/:id', messages_1.getMessagesController);
router.get('/user/:id', user_1.getUserController);
router.get('/dogs', dog_1.getAllDogsController);
router.get('/dogs/:id', dog_1.getDogsOfUser);
router.get('/matches/:id', dog_1.getAllDogMatches);
router.put('/dogs/:id', dog_1.putLikeDogController);
router.post("/image/:id", uploadMiddleware, images_1.postImageController);
exports.default = router;
