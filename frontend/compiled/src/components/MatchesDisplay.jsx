"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Context_1 = require("../Context/Context");
const ChatDisplay_1 = __importDefault(require("./ChatDisplay"));
const ArrowCircleLeft_1 = __importDefault(require("@mui/icons-material/ArrowCircleLeft"));
const APIServices_1 = __importDefault(require("../services/APIServices"));
const MatchesDisplay = () => {
    var _a, _b, _c;
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const [matchedProfiles, setMatchedProfiles] = (0, react_1.useState)([]);
    const [openChat, setOpenChat] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const dog = localStorage.getItem('currentDog');
        if (dog) {
            const parsedDog = JSON.parse(dog);
            contexts === null || contexts === void 0 ? void 0 : contexts.updateCurrentDog(contexts.currentDog);
            APIServices_1.default.getDogs().then((dogs) => {
                const showMatches = dogs.filter((dog) => {
                    return dog.matches_dogs.includes(parsedDog.id);
                });
                setMatchedProfiles(showMatches);
                console.log({ showMatches });
            });
        }
    }, []);
    return (<div className='matches-display'>
      {openChat ? (<div className='option'>
          <div className='chat-header'>
            <span onClick={() => setOpenChat(false)}>
              <ArrowCircleLeft_1.default />
            </span>
            <div className='selected-dog'>
              <h2> {(_a = contexts === null || contexts === void 0 ? void 0 : contexts.selectedDog) === null || _a === void 0 ? void 0 : _a.name}</h2>
              <img src={(_b = contexts === null || contexts === void 0 ? void 0 : contexts.selectedDog) === null || _b === void 0 ? void 0 : _b.url} alt={(_c = contexts === null || contexts === void 0 ? void 0 : contexts.selectedDog) === null || _c === void 0 ? void 0 : _c.url}/>
            </div>
          </div>
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
