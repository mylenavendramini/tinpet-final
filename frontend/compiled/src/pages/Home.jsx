"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Nav_1 = __importDefault(require("../components/Nav"));
const react_router_1 = require("react-router");
const Context_1 = require("../Context/Context");
const Home = () => {
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const authenticated = contexts === null || contexts === void 0 ? void 0 : contexts.authenticated;
    const navigate = (0, react_router_1.useNavigate)();
    return (<>
      <div className='overlay'>
        <Nav_1.default />
        <div className='home'>
          <h1 className='primary-title'>TinPet</h1>
          <p>
            Your pet is lonely and has no friends? TinPet is the solution, here
            you can contact other people who are also looking for friends for
            their pets, where you can make friends .... among other things...
          </p>
          {authenticated ? (<>
              <button className='btn-primary' onClick={() => navigate('/myDogs')}>
                See my dogs
              </button>
            </>) : (<>
              <button className='btn-primary' onClick={() => navigate('/register')}>
                Create Account
              </button>
              <button className='btn-primary' onClick={() => navigate('/login')}>
                Login
              </button>
            </>)}
        </div>
      </div>
    </>);
};
exports.default = Home;
