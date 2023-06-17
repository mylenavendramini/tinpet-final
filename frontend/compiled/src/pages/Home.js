"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const AuthModal_1 = __importDefault(require("../components/AuthModal"));
const Nav_1 = __importDefault(require("../components/Nav"));
const Home = () => {
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const [isSignUp, setIsSignUp] = (0, react_1.useState)(true);
    const authToken = false;
    const handleClick = () => {
        console.log('Click!!');
        setShowModal(true);
        setIsSignUp(true);
    };
    return (<>
      <div className='overlay'>
        <Nav_1.default setShowModal={setShowModal} showModal={showModal} setIsSignUp={setIsSignUp}/>
        <div className='home'>
          <h1 className='primary-title'>TinPet</h1>
          <p>Your pet is lonely and has no friends? TinPet is the solution, here you can contact other people who are also looking for friends for their pets, where you can make friends .... among other things...</p>
          <button className='btn-primary' onClick={handleClick}>
            {authToken ? 'Sign Out' : 'Create Account'}
          </button>

          {showModal && (<AuthModal_1.default setShowModal={setShowModal} isSignUp={isSignUp}/>)}
        </div>
      </div>
    </>);
};
exports.default = Home;
