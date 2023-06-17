"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const user_1 = require("../controllers/user");
const dog_1 = require("../controllers/dog");
const router = new koa_router_1.default();
router.post('/user', user_1.createUserController);
router.post('/dogs/:id', dog_1.createDogController);
router.get('/user/:id', user_1.getUserController);
router.get('/dogs', dog_1.getAllDogsController);
router.put('/dogs/:id', dog_1.putLikeDogController);
exports.default = router;
