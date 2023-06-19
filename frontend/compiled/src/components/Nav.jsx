"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const dog_face_svgrepo_com_svg_1 = __importDefault(require("../assets/dog-face-svgrepo-com.svg"));
const Context_1 = require("../Context/Context");
const react_router_dom_1 = require("react-router-dom");
const apiservices_1 = __importDefault(require("../services/apiservices"));
const Nav = () => {
    var _a;
    const [open, setOpen] = (0, react_1.useState)(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    const contexts = (0, react_1.useContext)(Context_1.Context);
    console.log(contexts === null || contexts === void 0 ? void 0 : contexts.user);
    const userId = (_a = contexts === null || contexts === void 0 ? void 0 : contexts.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log(userId);
    const myDogs = contexts === null || contexts === void 0 ? void 0 : contexts.myDogs;
    const getAllTheDogs = () => __awaiter(void 0, void 0, void 0, function* () {
        apiservices_1.default.getDogsofUSer(userId).then((data) => {
            contexts === null || contexts === void 0 ? void 0 : contexts.updateMyDogs(data);
        });
    });
    console.log(contexts === null || contexts === void 0 ? void 0 : contexts.user, 'NAV');
    (0, react_1.useEffect)(() => {
        if (contexts === null || contexts === void 0 ? void 0 : contexts.authenticated) {
            console.log(contexts === null || contexts === void 0 ? void 0 : contexts.user);
            getAllTheDogs();
        }
        else {
            console.log('no users');
        }
    }, []);
    const logout = () => {
        contexts === null || contexts === void 0 ? void 0 : contexts.updateModal();
        contexts === null || contexts === void 0 ? void 0 : contexts.updateSignUp();
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
        navigate('/dashboard');
    };
    console.log(contexts === null || contexts === void 0 ? void 0 : contexts.authenticated, 'auth');
    return (<nav>
      <div className='logo-container'>
        <img className='logo' src={dog_face_svgrepo_com_svg_1.default} onClick={handleOpen}/>
        {open && (<div className='dropdown-btns'>
            {!(contexts === null || contexts === void 0 ? void 0 : contexts.authenticated) ? (<button id='login' className='btn-nav' onClick={login}>
                Log In
              </button>) : (<button id='logout' className='btn-nav' onClick={logout}>
                Log Out
              </button>)}
            {myDogs === null || myDogs === void 0 ? void 0 : myDogs.map((dog, idx) => (<button className='btn-nav' onClick={() => handleClickDog(dog)} key={idx}>
                {dog.name}
              </button>))}
            <button className='btn-nav' onClick={() => navigate('/dashboard')}>
              Start chat
            </button>
            <button className='btn-nav' onClick={() => navigate(`/onboarding/${userId}`)}>
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
