"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Context_1 = require("../Context/Context");
const ChatDisplay_1 = __importDefault(require("./ChatDisplay"));
const ArrowCircleLeft_1 = __importDefault(require("@mui/icons-material/ArrowCircleLeft"));
const MatchesDisplay = () => {
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const matchedProfiles = contexts === null || contexts === void 0 ? void 0 : contexts.matchedDogs;
    const [openChat, setOpenChat] = (0, react_1.useState)(false);
    console.log(openChat);
    return (<div className='matches-display'>
      {openChat ? (<div className='option'>
          <span onClick={() => setOpenChat(false)}>
            <ArrowCircleLeft_1.default />
          </span>
          <ChatDisplay_1.default />
        </div>) : (<>
          <h2 className=''>Matches</h2>
          {matchedProfiles === null || matchedProfiles === void 0 ? void 0 : matchedProfiles.map((matchProfile, idx) => (<div key={idx} className='match-card' onClick={() => contexts === null || contexts === void 0 ? void 0 : contexts.updateSelectedDog(matchProfile)}>
              <div className='img-container' onClick={() => setOpenChat(!openChat)}>
                <img src={matchProfile === null || matchProfile === void 0 ? void 0 : matchProfile.url} alt='matched photo'/>
              </div>
              <h3>{matchProfile === null || matchProfile === void 0 ? void 0 : matchProfile.name}</h3>
            </div>))}
        </>)}
    </div>);
};
exports.default = MatchesDisplay;
