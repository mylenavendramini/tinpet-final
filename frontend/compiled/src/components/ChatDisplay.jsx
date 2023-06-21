"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chat_1 = __importDefault(require("./Chat"));
const ChatInput_1 = __importDefault(require("./ChatInput"));
const react_1 = require("react");
const Context_1 = require("../Context/Context");
//TODO:
const ChatDisplay = () => {
    const contexts = (0, react_1.useContext)(Context_1.Context);
    return (<>
      {/*<Chat descendingOrderMessages={descendingOrderMessages} />*/}
      <Chat_1.default />
      <ChatInput_1.default />
    </>);
};
exports.default = ChatDisplay;
