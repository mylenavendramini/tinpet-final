"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const ChatDisplay_1 = __importDefault(require("./ChatDisplay"));
const MatchesDisplay_1 = __importDefault(require("./MatchesDisplay"));
const ChatHeader_1 = __importDefault(require("./ChatHeader"));
const react_1 = require("react");
//TODO:
const ChatContainer = ({ user }) => {
    const [clickedUser, setClickedUser] = (0, react_1.useState)(null);
    // console.log('clickeduser', clickedUser);
    return (<div className='chat-container'>
      <ChatHeader_1.default user={user}/>
      <div>
        <button className='option' onClick={() => setClickedUser(null)}>
          Matches
        </button>
        <button className='option' disabled={!clickedUser}>
          Chat
        </button>
      </div>

      {!clickedUser && (<MatchesDisplay_1.default matches={user.matches} setClickedUser={setClickedUser}/>)}

      {clickedUser && <ChatDisplay_1.default user={user} clickedUSer={clickedUser}/>}
    </div>);
};
exports.default = ChatContainer;
