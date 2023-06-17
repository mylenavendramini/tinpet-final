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
const Context_1 = require("../Context/Context");
const ChatContainer = ({ user }) => {
    const [clickedUser, setClickedUser] = (0, react_1.useState)(null);
    const context = (0, react_1.useContext)(Context_1.Context);
    const dogs = context === null || context === void 0 ? void 0 : context.dogs;
    const dogsMatches = dogs === null || dogs === void 0 ? void 0 : dogs.map((dog) => dog.matches_dogs);
    return (<div className='chat-container'>
      {/*TODO:*/}
      <ChatHeader_1.default user={user}/>
      <div>
        <button className='option' onClick={() => setClickedUser(null)}>
          Matches
        </button>
        <button className='option' disabled={!clickedUser}>
          Chat
        </button>
      </div>

      {!clickedUser && (<MatchesDisplay_1.default matches={dogsMatches} setClickedUser={setClickedUser}/>)}

      {clickedUser && <ChatDisplay_1.default user={user} clickedUSer={clickedUser}/>}
    </div>);
};
exports.default = ChatContainer;
