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
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const Chat_1 = __importDefault(require("./Chat"));
const ChatInput_1 = __importDefault(require("./ChatInput"));
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
//TODO:
const ChatDisplay = ({ user, clickedUSer }) => {
    const userId = user === null || user === void 0 ? void 0 : user.user_id;
    const clickedUserId = clickedUSer === null || clickedUSer === void 0 ? void 0 : clickedUSer.user_id;
    const [usersMessages, setUsersMessages] = (0, react_1.useState)(null);
    const [clickedUsersMessages, setClickedUsersMessages] = (0, react_1.useState)(null);
    const getUsersMessages = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get('http://localhost:3000/messages', {
                params: { userId: userId, correspondingUserId: clickedUserId },
            });
            setUsersMessages(response.data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const getClickedUsersMessages = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get('http://localhost:3000/messages', {
                params: { userId: clickedUserId, correspondingUserId: userId },
            });
            setClickedUsersMessages(response.data);
        }
        catch (error) {
            console.log(error);
        }
    });
    (0, react_1.useEffect)(() => {
        getUsersMessages();
        getClickedUsersMessages();
    }, []);
    const messages = [];
    usersMessages === null || usersMessages === void 0 ? void 0 : usersMessages.forEach((message) => {
        const formattedMessage = {};
        formattedMessage['name'] = user === null || user === void 0 ? void 0 : user.name;
        formattedMessage['img'] = user === null || user === void 0 ? void 0 : user.url;
        formattedMessage['message'] = message.message;
        formattedMessage['timestamp'] = message.timestamp;
        messages.push(formattedMessage);
    });
    clickedUsersMessages === null || clickedUsersMessages === void 0 ? void 0 : clickedUsersMessages.forEach((message) => {
        const formattedMessage = {};
        formattedMessage['name'] = clickedUSer === null || clickedUSer === void 0 ? void 0 : clickedUSer.name;
        formattedMessage['img'] = clickedUSer === null || clickedUSer === void 0 ? void 0 : clickedUSer.url;
        formattedMessage['message'] = message.message;
        formattedMessage['timestamp'] = message.timestamp;
        messages.push(formattedMessage);
    });
    const descendingOrderMessages = messages === null || messages === void 0 ? void 0 : messages.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    return (<>
      <Chat_1.default descendingOrderMessages={descendingOrderMessages}/>
      <ChatInput_1.default user={user} clickedUser={clickedUSer} getUserMessages={getUsersMessages} getClickedUsersMessages={getClickedUsersMessages}/>
    </>);
};
exports.default = ChatDisplay;
