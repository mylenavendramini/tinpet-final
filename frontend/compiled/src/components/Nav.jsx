"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const dog_face_svgrepo_com_svg_1 = __importDefault(require("../assets/dog-face-svgrepo-com.svg"));
const Context_1 = require("../Context/Context");
const react_router_dom_1 = require("react-router-dom");
const Nav = () => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const myDogs = contexts === null || contexts === void 0 ? void 0 : contexts.myDogs;
    const logout = () => {
        contexts === null || contexts === void 0 ? void 0 : contexts.updateModal();
        contexts === null || contexts === void 0 ? void 0 : contexts.updateSignUp();
        contexts === null || contexts === void 0 ? void 0 : contexts.updateAuthenticated();
    };
    const login = () => {
        navigate('/login');
    };
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleClickDog = (dogId) => {
        setCurrentDog(dogId);
    };
    // const authToken = true;
    return (<nav>
      <div className='logo-container'>
        <img className='logo' src={dog_face_svgrepo_com_svg_1.default} onClick={handleOpen}/>
        {open && (<div className='dropdown-btns'>
            {(contexts === null || contexts === void 0 ? void 0 : contexts.authenticated) ? (<button id='login' className='btn-nav' onClick={login}>
                Log In
              </button>) : (<button id='logout' className='btn-nav' onClick={logout} disabled={contexts === null || contexts === void 0 ? void 0 : contexts.showModal}>
                Log Out
              </button>)}
            {myDogs === null || myDogs === void 0 ? void 0 : myDogs.map((dog) => (<button className='btn-nav' onClick={() => handleClickDog(dog.id)}>
                {dog.name}
              </button>))}
            <button className='btn-nav' onClick={() => navigate('/dashboard')}>
              Start chat
            </button>
            <button className='btn-nav' onClick={() => navigate('/onboarding')}>
              Add new dog
            </button>
          </div>)}
      </div>

      {/*contexts?.authenticated ? (
          <button id='login' className='btn-nav' onClick={login}>
            Log In
          </button>
        ) : (
          <button
            id='logout'
            className='btn-nav'
            onClick={logout}
            disabled={contexts?.showModal}
          >
            Log Out
          </button>
        )*/}
    </nav>);
};
exports.default = Nav;
