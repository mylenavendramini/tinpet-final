"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatDisplay_1 = __importDefault(require("./ChatDisplay"));
const MatchesDisplay_1 = __importDefault(require("./MatchesDisplay"));
const ChatHeader_1 = __importDefault(require("./ChatHeader"));
const react_1 = require("react");
const Context_1 = require("../Context/Context");
const ChatContainer = ({ user }) => {
    const [clickedChat, setClickedChat] = (0, react_1.useState)(false);
    const [fetchedMatches, setFetchedMatches] = (0, react_1.useState)(false);
    const [fetchedMessages, setFetchedMessages] = (0, react_1.useState)(false);
    const context = (0, react_1.useContext)(Context_1.Context);
    const myDogs = context === null || context === void 0 ? void 0 : context.myDogs;
    // useEffect(() => {
    //   apiService.getMatches(context?.currentDog?.id as number).then((res) => {
    //     context?.updateMatches(res);
    //     console.log(res, 'RESULT')
    //   });
    // }, []);
    return (<div className='chat-container'>
      <ChatHeader_1.default />
      <div>
        <button className='option' onClick={() => setClickedChat(false)}>
          Matches
        </button>
        <button className='option' onClick={() => setClickedChat(true)}>
          Chat
        </button>
      </div>

      {!clickedChat && (<MatchesDisplay_1.default />)}
      {clickedChat && <ChatDisplay_1.default />}
    </div>);
};
exports.default = ChatContainer;
{
    /*<MatchesDisplay matches={dogsMatches} setClickedDog={setClickedDog} />*/
}
