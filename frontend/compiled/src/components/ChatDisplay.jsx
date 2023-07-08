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
    const [messages, setMessages] = (0, react_1.useState)([]);
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const addMessage = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const receiver_id = (_a = contexts === null || contexts === void 0 ? void 0 : contexts.selectedDog) === null || _a === void 0 ? void 0 : _a.id;
        const receiver_name = (_b = contexts === null || contexts === void 0 ? void 0 : contexts.selectedDog) === null || _b === void 0 ? void 0 : _b.name;
        const newMessage = {
            content: message,
            receiver_id,
            receiver_name,
        };
        const dog = localStorage.getItem('currentDog');
        if (dog) {
            const parsedDog = JSON.parse(dog);
            const parsedId = parsedDog.id;
            APIServices_1.default.sendMessage(parsedId, newMessage).then((message) => {
                setMessages([...messages, message]);
            });
        }
        setMessage('');
    });
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addMessage();
        }
    };
    const getMessages = () => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d, _e, _f;
        const dog = localStorage.getItem('currentDog');
        if (dog) {
            const parsedDog = JSON.parse(dog);
            console.log(parsedDog);
            contexts === null || contexts === void 0 ? void 0 : contexts.updateCurrentDog(parsedDog);
            console.log(contexts === null || contexts === void 0 ? void 0 : contexts.currentDog);
            // const dogMessages = contexts?.currentDog?.messages as Message[];
            const receiveMessages = (_d = (_c = contexts === null || contexts === void 0 ? void 0 : contexts.selectedDog) === null || _c === void 0 ? void 0 : _c.messages) === null || _d === void 0 ? void 0 : _d.filter((message) => {
                var _a;
                return message.receiver_id === ((_a = contexts.currentDog) === null || _a === void 0 ? void 0 : _a.id);
            });
            const sentMessages = (_f = (_e = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog) === null || _e === void 0 ? void 0 : _e.messages) === null || _f === void 0 ? void 0 : _f.filter((message) => {
                var _a;
                return message.receiver_id === ((_a = contexts.selectedDog) === null || _a === void 0 ? void 0 : _a.id);
            });
            setMessages([...receiveMessages, ...sentMessages].sort((a, b) => Number(a === null || a === void 0 ? void 0 : a.id) - Number(b === null || b === void 0 ? void 0 : b.id)));
        }
    });
    (0, react_1.useEffect)(() => {
        getMessages();
    }, []);
    return (<>
      <div className='chat-display'>
        {messages &&
            messages.map((message, idx) => {
                var _a;
                if (message.receiver_id !== ((_a = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog) === null || _a === void 0 ? void 0 : _a.id)) {
                    return (<div className='chat-message-header right' key={idx}>
                  <p>{message.content}</p>
                </div>);
                }
                else {
                    return (<div className='chat-message-header left'>
                  <p>{message.content}</p>
                </div>);
                }
            })}
      </div>
      <div className='chat-input'>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => handleKeyPress(e)}></textarea>
        <button className='btn-secondary' onClick={addMessage}>
          Submit
        </button>
      </div>
    </>);
};
exports.default = ChatDisplay;
