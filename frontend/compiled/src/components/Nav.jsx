"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const dog_face_svgrepo_com_svg_1 = __importDefault(require("../assets/dog-face-svgrepo-com.svg"));
const Home_1 = __importDefault(require("@mui/icons-material/Home"));
const Pets_1 = __importDefault(require("@mui/icons-material/Pets"));
const AddCircle_1 = __importDefault(require("@mui/icons-material/AddCircle"));
const Context_1 = require("../Context/Context");
const react_router_dom_1 = require("react-router-dom");
const Nav = () => {
    var _a;
    const [open, setOpen] = (0, react_1.useState)(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const userId = (_a = contexts === null || contexts === void 0 ? void 0 : contexts.user) === null || _a === void 0 ? void 0 : _a.id;
    const myDogs = contexts === null || contexts === void 0 ? void 0 : contexts.myDogs;
    const logout = () => {
        contexts === null || contexts === void 0 ? void 0 : contexts.updateModal();
        contexts === null || contexts === void 0 ? void 0 : contexts.updateSignUp(false);
        contexts === null || contexts === void 0 ? void 0 : contexts.updateAuthenticated(false);
        localStorage.clear();
        navigate('/');
    };
    const login = () => {
        navigate('/login');
    };
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleClickDog = (dog) => {
        contexts === null || contexts === void 0 ? void 0 : contexts.updateCurrentDog(dog);
        localStorage.removeItem('currentDog');
        localStorage.setItem('currentDog', JSON.stringify(dog));
        navigate(`/dashboard/${dog.id}`);
    };
    return (<nav>
      <div className='logo-container'>
        <img className='logo' src={dog_face_svgrepo_com_svg_1.default} onClick={handleOpen}/>
        {open && (<div className='dropdown-btns'>
            <button className='btn-nav' onClick={() => navigate('/')}>
              <Home_1.default />
              <span>Home</span>
            </button>
            {!(contexts === null || contexts === void 0 ? void 0 : contexts.authenticated) ? (<button id='login' className='btn-nav blue' onClick={login}>
                Log In
              </button>) : (<>
                {myDogs === null || myDogs === void 0 ? void 0 : myDogs.map((dog, idx) => (<button className='btn-nav' onClick={() => handleClickDog(dog)} key={idx}>
                    <Pets_1.default />
                    <span>{dog.name}</span>
                  </button>))}
                <button className='btn-nav' onClick={() => navigate(`/onboarding/${userId}`)}>
                  <AddCircle_1.default />
                  <span>Add new dog</span>
                </button>
                <button id='logout' className='btn-nav blue' onClick={logout}>
                  Log Out
                </button>
              </>)}
          </div>)}
      </div>
    </nav>);
};
exports.default = Nav;
