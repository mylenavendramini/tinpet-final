"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const ChatDisplay_1 = __importDefault(require("./ChatDisplay"));
const ChatHeader_1 = __importDefault(require("./ChatHeader"));
const react_1 = require("react");
const Context_1 = require("../Context/Context");
const APIServices_1 = __importDefault(require("../services/APIServices"));
const ChatContainer = ({ user }) => {
    const [clickedDog, setClickedDog] = (0, react_1.useState)(null);
    const context = (0, react_1.useContext)(Context_1.Context);
    const myDogs = context === null || context === void 0 ? void 0 : context.myDogs;
    const dogsMatches = myDogs === null || myDogs === void 0 ? void 0 : myDogs.map((dog) => dog.matches_dogs); //TODO:something tells me this will not work because MatchesDisplay is expecting an array of Dogs but will will be an
    //array of numbers... - Harold
    // would make more sense to use the matches in the context...
    //i think this would make more sense then map over the context.matchedDogs
    (0, react_1.useEffect)(() => {
        var _a;
        APIServices_1.default.getMatches((_a = context === null || context === void 0 ? void 0 : context.currentDog) === null || _a === void 0 ? void 0 : _a.id).then((res) => {
            context === null || context === void 0 ? void 0 : context.updateMatches(res);
        });
    }, []);
    return (<div className='chat-container'>
      {/*TODO:*/}
      <ChatHeader_1.default />
      {/* <ChatHeader user={user} /> */}
      <div>
        <button className='option' onClick={() => setClickedDog(null)}>
          Matches
        </button>
        <button className='option' disabled={!clickedDog}>
          Chat
        </button>
      </div>

      {/* {!clickedDog && (
          {/*<MatchesDisplay matches={dogsMatches} setClickedDog={setClickedDog} />*/}
         {/*<MatchesDisplay matches={context?.matchedDogs as Dog[]} setClickedDog={context?.updateSelectedDog as Function} />*/}
      

      {/* clickedDog && <ChatDisplay user={user} clickedDog={clickedDog} />*/}
      {clickedDog && <ChatDisplay_1.default />}
      {/* ChatDisplay wont need any props cause its now using Context to access the props it needs */}
    </div>);
};
exports.default = ChatContainer;
