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
const APIServices_1 = __importDefault(require("../services/APIServices"));
const Nav = () => {
    var _a;
    const [open, setOpen] = (0, react_1.useState)(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    const contexts = (0, react_1.useContext)(Context_1.Context);
    // console.log(contexts?.user);
    const userId = (_a = contexts === null || contexts === void 0 ? void 0 : contexts.user) === null || _a === void 0 ? void 0 : _a.id;
    const myDogs = contexts === null || contexts === void 0 ? void 0 : contexts.myDogs;
    const getAllTheDogs = () => __awaiter(void 0, void 0, void 0, function* () {
        APIServices_1.default
            // .getDogsofUSer(userId)
            .getDogsofUSer(3)
            .then((data) => {
            contexts === null || contexts === void 0 ? void 0 : contexts.updateMyDogs(data);
        });
    });
    (0, react_1.useEffect)(() => {
        getAllTheDogs();
    }, []);
    const logout = () => {
        contexts === null || contexts === void 0 ? void 0 : contexts.updateModal();
        contexts === null || contexts === void 0 ? void 0 : contexts.updateSignUp();
        contexts === null || contexts === void 0 ? void 0 : contexts.updateAuthenticated();
    };
    const login = () => {
        navigate('/login');
    };
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleClickDog = (dog) => {
        contexts === null || contexts === void 0 ? void 0 : contexts.updateCurrentDog(dog);
        navigate('/dashboard');
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
