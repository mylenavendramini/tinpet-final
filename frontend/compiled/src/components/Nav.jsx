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
const Home_1 = __importDefault(require("@mui/icons-material/Home"));
const Pets_1 = __importDefault(require("@mui/icons-material/Pets"));
const AddCircle_1 = __importDefault(require("@mui/icons-material/AddCircle"));
const Chat_1 = __importDefault(require("@mui/icons-material/Chat"));
const Context_1 = require("../Context/Context");
const react_router_dom_1 = require("react-router-dom");
const APIServices_1 = __importDefault(require("../services/APIServices"));
const Nav = () => {
    var _a, _b;
    const [open, setOpen] = (0, react_1.useState)(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const userId = (_a = contexts === null || contexts === void 0 ? void 0 : contexts.user) === null || _a === void 0 ? void 0 : _a.id;
    const myDogs = contexts === null || contexts === void 0 ? void 0 : contexts.myDogs;
    const matchedIds = (_b = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog) === null || _b === void 0 ? void 0 : _b.matches_dogs;
    const dogs = contexts === null || contexts === void 0 ? void 0 : contexts.dogs;
    const getAllUserDogs = () => __awaiter(void 0, void 0, void 0, function* () {
        APIServices_1.default.getDogsofUSer(userId).then((data) => {
            contexts === null || contexts === void 0 ? void 0 : contexts.updateMyDogs(data);
        });
    });
    // console.log(contexts?.currentDog?.matches_dogs)
    // const getMatches = () => {
    //   apiService.getMatches(contexts?.currentDog?.id as number).then((res) => {
    //     const matchedDogs: Dog[] = [];
    //     console.log(res)
    //     res.forEach((id:number) => {
    //     dogs?.map((dog) => {
    //       if(dog.id === id) matchedDogs.push(dog)
    //     })
    //   })
    //   contexts?.updateMatches(matchedDogs)
    //   }).then((res) => navigate('/dashboard'))
    const getMatches = () => {
        const matchedDogs = [];
        matchedIds === null || matchedIds === void 0 ? void 0 : matchedIds.forEach((id) => {
            dogs === null || dogs === void 0 ? void 0 : dogs.map((dog) => {
                if (dog.id === id)
                    matchedDogs.push(dog);
            });
        });
        contexts === null || contexts === void 0 ? void 0 : contexts.updateMatches(matchedDogs);
    };
    (0, react_1.useEffect)(() => {
        if (contexts === null || contexts === void 0 ? void 0 : contexts.authenticated) {
            console.log(contexts === null || contexts === void 0 ? void 0 : contexts.user);
            getAllUserDogs();
        }
        else {
            console.log('no users');
        }
    }, []);
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
        getMatches();
        navigate('/dashboard');
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
                <button className='btn-nav' onClick={() => navigate('/dashboard')}>
                  <Chat_1.default />
                  <span>Start chat</span>
                </button>
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
