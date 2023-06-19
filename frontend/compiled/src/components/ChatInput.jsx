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
const react_1 = require("react");
const APIServices_1 = __importDefault(require("../services/APIServices"));
const Context_1 = require("../Context/Context");
const ChatInput = () => {
    // user={user} i think must be changed to current dog
    // clickedUser={clickedUSer} must be changed to clicked/selected dog to message
    // getUserMessages={getUsersMessages}
    // getClickedUsersMessages={getClickedUsersMessages}
    const [message, setMessage] = (0, react_1.useState)('');
    const contexts = (0, react_1.useContext)(Context_1.Context);
    // const userId = user?.user_id;
    // const clickedUserId = clickedUser?.user_id;
    const addMessage = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const id = (_a = contexts === null || contexts === void 0 ? void 0 : contexts.user) === null || _a === void 0 ? void 0 : _a.id;
        const newMessage = {
            content: message,
            sender: id,
            receiver: (_b = contexts === null || contexts === void 0 ? void 0 : contexts.selectedDog) === null || _b === void 0 ? void 0 : _b.id,
        };
        APIServices_1.default.sendMessage(id, newMessage).then((res) => {
            contexts === null || contexts === void 0 ? void 0 : contexts.updateMessages([...contexts.messages, res]);
        });
    });
    return (<div className='chat-input'>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
      <button className='btn-secondary' onClick={addMessage}>
        Submit
      </button>
    </div>);
};
exports.default = ChatInput;
