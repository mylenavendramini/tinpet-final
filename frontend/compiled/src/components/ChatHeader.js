"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const Logout_1 = __importDefault(require("@mui/icons-material/Logout"));
const react_cookie_1 = require("react-cookie");
const react_router_dom_1 = require("react-router-dom");
//TODO:
const ChatHeader = ({ user }) => {
    const [cookies, setCookie, removeCookie] = (0, react_cookie_1.useCookies)(['user']);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const logout = () => {
        removeCookie('UserId', cookies.UserId);
        removeCookie('AuthToken', cookies.Authtoken);
        navigate('/');
    };
    return (<div className='chat-container-header'>
      <div className='profile'>
        <div className='img-container'>
          <img src={user.url} alt='user photo'/>
        </div>
        <h3>{user.name}</h3>
      </div>
      <i className='logout-icon' onClick={logout}>
        <Logout_1.default />
      </i>
    </div>);
};
exports.default = ChatHeader;
