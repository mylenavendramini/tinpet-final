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
/* eslint-disable react/prop-types */
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
//TODO:
const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUsersMessages, }) => {
    const [textArea, setTextArea] = (0, react_1.useState)('');
    const userId = user === null || user === void 0 ? void 0 : user.user_id;
    const clickedUserId = clickedUser === null || clickedUser === void 0 ? void 0 : clickedUser.user_id;
    const addMessage = () => __awaiter(void 0, void 0, void 0, function* () {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message: textArea,
        };
        try {
            yield axios_1.default.post('http://localhost:3000/message', { message });
            getUserMessages();
            getClickedUsersMessages();
            setTextArea('');
        }
        catch (error) {
            console.log(error);
        }
    });
    return (<div className='chat-input'>
      <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}></textarea>
      <button className='btn-secondary' onClick={addMessage}>
        Submit
      </button>
    </div>);
};
exports.default = ChatInput;
