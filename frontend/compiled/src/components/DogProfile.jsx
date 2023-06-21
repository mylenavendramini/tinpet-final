"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MatchesDisplay_1 = __importDefault(require("./MatchesDisplay"));
const react_1 = require("react");
const ProfileHeader_1 = __importDefault(require("./ProfileHeader"));
const DogProfile = () => {
    const [fetchedMatches, setFetchedMatches] = (0, react_1.useState)(false);
    const [fetchedMessages, setFetchedMessages] = (0, react_1.useState)(false);
    return (<div className='chat-container'>
      <ProfileHeader_1.default />
      <MatchesDisplay_1.default />
    </div>);
};
exports.default = DogProfile;
