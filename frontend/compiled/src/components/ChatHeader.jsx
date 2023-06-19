"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logout_1 = __importDefault(require("@mui/icons-material/Logout"));
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const Context_1 = require("./Context/Context");
//TODO:
const ChatHeader = () => {
    // const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const context = (0, react_1.useContext)(Context_1.Context);
    const dogs = context === null || context === void 0 ? void 0 : context.dogs;
    const updateDog = context === null || context === void 0 ? void 0 : context.updateDog;
    const dogName = dogs === null || dogs === void 0 ? void 0 : dogs.map((dog) => dog.name);
    const dogUrl = dogs === null || dogs === void 0 ? void 0 : dogs.map((dog) => dog.url);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const logout = () => {
        // removeCookie('UserId', cookies.UserId);
        // removeCookie('AuthToken', cookies.Authtoken);
        navigate('/');
    };
    return (<div className='chat-container-header'>
      <div className='profile'>
        <div className='img-container'>
          {/* something tells me this will not work - Harold
        img src takes in a string and would be an array of string */}
          <img src={`${dogUrl}`} alt='user photo'/>
        </div>
        <h3>{dogName}</h3>
      </div>
      <i className='logout-icon' onClick={logout}>
        <Logout_1.default />
      </i>
    </div>);
};
exports.default = ChatHeader;
