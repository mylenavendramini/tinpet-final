"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatDisplay_1 = __importDefault(require("./ChatDisplay"));
const MatchesDisplay_1 = __importDefault(require("./MatchesDisplay"));
const react_1 = require("react");
const Context_1 = require("../Context/Context");
const APIServices_1 = __importDefault(require("../services/APIServices"));
const ArrowCircleLeft_1 = __importDefault(require("@mui/icons-material/ArrowCircleLeft"));
const react_router_1 = require("react-router");
const ChatContainer = () => {
    var _a, _b;
    const [clicked, setClicked] = (0, react_1.useState)(false);
    const [fetchedMatches, setFetchedMatches] = (0, react_1.useState)(false);
    const [fetchedMessages, setFetchedMessages] = (0, react_1.useState)(false);
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const navigate = (0, react_router_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        var _a;
        APIServices_1.default.getMatches((_a = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog) === null || _a === void 0 ? void 0 : _a.id).then((res) => {
            contexts === null || contexts === void 0 ? void 0 : contexts.updateMatches(res);
            console.log(res, 'RESULT');
        });
    }, []);
    return (<div className='chat-container'>
      <div className='chat-container-header'>
        <div className='profile'>
          <div className='img-container'>
            <img src={(_a = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog) === null || _a === void 0 ? void 0 : _a.url} alt='user photo'/>
          </div>
          <h3>{(_b = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog) === null || _b === void 0 ? void 0 : _b.name}</h3>
        </div>
        <i className='logout-icon' onClick={() => navigate('/myDogs')}>
          <ArrowCircleLeft_1.default />
        </i>
      </div>
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
exports.default = ChatContainer;
