"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
//TODO:
const dog_face_svgrepo_com_svg_1 = __importDefault(require("../assets/dog-face-svgrepo-com.svg"));
const Context_1 = require("../Context/Context");
const Nav = () => {
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const handleClick = () => {
        contexts === null || contexts === void 0 ? void 0 : contexts.updateModal();
        contexts === null || contexts === void 0 ? void 0 : contexts.updateSignUp();
    };
    // const authToken = true;
    return (<nav>
      <div className='logo-container'>
        <img className='logo' src={dog_face_svgrepo_com_svg_1.default}/>
      </div>
      {<button className='btn-nav' onClick={handleClick} disabled={contexts === null || contexts === void 0 ? void 0 : contexts.showModal}>
          Log In
        </button>}
    </nav>);
};
exports.default = Nav;
