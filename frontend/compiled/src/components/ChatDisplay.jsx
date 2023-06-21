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
const Context_1 = require("../Context/Context");
const APIServices_1 = __importDefault(require("../services/APIServices"));
const ChatDisplay = () => {
    const [message, setMessage] = (0, react_1.useState)('');
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const addMessage = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const sender_id = (_a = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog) === null || _a === void 0 ? void 0 : _a.id;
        const sender_name = (_b = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog) === null || _b === void 0 ? void 0 : _b.name;
        const receiver_id = (_c = contexts === null || contexts === void 0 ? void 0 : contexts.selectedDog) === null || _c === void 0 ? void 0 : _c.id;
        const receiver_name = (_d = contexts === null || contexts === void 0 ? void 0 : contexts.selectedDog) === null || _d === void 0 ? void 0 : _d.name;
        const newMessage = {
            content: message,
            sender_id,
            sender_name,
            receiver_id,
            receiver_name,
        };
        console.log(newMessage);
        APIServices_1.default.sendMessage(sender_id, newMessage).then((message) => {
            contexts === null || contexts === void 0 ? void 0 : contexts.updateMessages([...contexts.messages, message]);
        });
    });
    console.log(contexts === null || contexts === void 0 ? void 0 : contexts.messages);
    // const getMessages = async () => {
    //   apiService.getMessages();
    // };
    return (<>
      <div className='chat-display'>
        {contexts === null || contexts === void 0 ? void 0 : contexts.messages.map((message) => {
            var _a;
            return (<div key={message.id}>
            <div className='chat-message-header'>
              <div className='img-container'>
                <img src={(_a = contexts === null || contexts === void 0 ? void 0 : contexts.selectedDog) === null || _a === void 0 ? void 0 : _a.url} alt={message.receiver + ' profile'}/>{' '}
                {/*contexts?.selectedDog?.url} is subject to change */}
              </div>
              <p>{message.receiver}</p>
            </div>
            <p>{message.content}</p>
          </div>);
        })}
      </div>
      <div className='chat-input'>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        <button className='btn-secondary' onClick={addMessage}>
          Submit
        </button>
      </div>
    </>);
};
exports.default = ChatDisplay;
