"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArrowCircleLeft_1 = __importDefault(require("@mui/icons-material/ArrowCircleLeft"));
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const Context_1 = require("../Context/Context");
const ProfileHeader = () => {
    var _a, _b;
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<div className='chat-container-header'>
      <div className='profile'>
        <div className='img-container'>
          <img src={(_a = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog) === null || _a === void 0 ? void 0 : _a.url} alt='user photo'/>
        </div>
        <h3>{(_b = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog) === null || _b === void 0 ? void 0 : _b.name}</h3>
      </div>
      <i className='logout-icon' onClick={() => navigate('/myDogs')}>
        <ArrowCircleLeft_1.default />
      </i>
    </div>);
};
exports.default = ProfileHeader;
