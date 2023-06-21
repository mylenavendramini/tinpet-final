"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatDisplay_1 = __importDefault(require("./ChatDisplay"));
const MatchesDisplay_1 = __importDefault(require("./MatchesDisplay"));
const react_1 = require("react");
const ProfileHeader_1 = __importDefault(require("./ProfileHeader"));
const DogProfile = () => {
    const [clicked, setClicked] = (0, react_1.useState)(false);
    const [fetchedMatches, setFetchedMatches] = (0, react_1.useState)(false);
    const [fetchedMessages, setFetchedMessages] = (0, react_1.useState)(false);
    return (<div className='chat-container'>
      <ProfileHeader_1.default />
      <div>
        <button className='option clicked' onClick={() => setClicked(true)}>
          Matches
        </button>
        <button className='option' onClick={() => setClicked(false)}>
          Chat
        </button>
      </div>
      {clicked ? <MatchesDisplay_1.default /> : <ChatDisplay_1.default />}
    </div>);
};
exports.default = DogProfile;
