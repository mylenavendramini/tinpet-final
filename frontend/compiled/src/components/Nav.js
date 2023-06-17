"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/prop-types */
const dog_face_svgrepo_com_svg_1 = __importDefault(require("../assets/dog-face-svgrepo-com.svg"));
//TODO:
const Nav = ({ setShowModal, showModal, setIsSignUp, authToken }) => {
    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(false);
    };
    // const authToken = true;
    return (<nav>
      <div className='logo-container'>
        <img className='logo' src={dog_face_svgrepo_com_svg_1.default}/>
      </div>
      {!authToken && (<button className='btn-nav' onClick={handleClick} disabled={showModal}>
          Log In
        </button>)}
    </nav>);
};
exports.default = Nav;
