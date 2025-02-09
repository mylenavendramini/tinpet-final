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
const Home_1 = __importDefault(require("./pages/Home"));
const Dashboard_1 = __importDefault(require("./pages/Dashboard"));
const Onboarding_1 = __importDefault(require("./pages/Onboarding"));
const react_router_dom_1 = require("react-router-dom");
const Login_1 = __importDefault(require("./components/Login"));
const react_1 = require("react");
const Context_1 = require("./Context/Context");
const APIServices_1 = __importDefault(require("./services/APIServices"));
const Register_1 = __importDefault(require("./components/Register"));
const MyDogs_1 = __importDefault(require("./components/MyDogs"));
const App = () => {
    var _a, _b;
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const currentDog = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog;
    const matches = (_a = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog) === null || _a === void 0 ? void 0 : _a.matches_dogs;
    const liked = (_b = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog) === null || _b === void 0 ? void 0 : _b.liked_dog;
    const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        APIServices_1.default.login(email, password).then((user) => {
            contexts === null || contexts === void 0 ? void 0 : contexts.updateUser(user);
        });
    });
    (0, react_1.useEffect)(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const { id } = JSON.parse(user);
            APIServices_1.default.getUser(id).then((user) => {
                console.log(user);
                contexts === null || contexts === void 0 ? void 0 : contexts.updateMyDogs(user.dogs);
            });
        }
    }, [contexts === null || contexts === void 0 ? void 0 : contexts.authenticated]);
    (0, react_1.useEffect)(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const { email, password, id } = JSON.parse(user);
            login(email, password).then((data) => {
                contexts === null || contexts === void 0 ? void 0 : contexts.updateAuthenticated(true);
            });
        }
        else {
            console.log('You need to login first');
        }
    }, []);
    (0, react_1.useEffect)(() => {
        APIServices_1.default.getDogs().then((dogs) => {
            contexts === null || contexts === void 0 ? void 0 : contexts.updateDogs([...dogs]);
        });
    }, [matches, liked]);
    return (<div className='app'>
      <react_router_dom_1.BrowserRouter>
        <react_router_dom_1.Routes>
          {<react_router_dom_1.Route path='/' element={<Home_1.default />}/>}
          {<react_router_dom_1.Route path='/myDogs' element={<MyDogs_1.default />}/>}
          {<react_router_dom_1.Route path='/dashboard/:id' element={<Dashboard_1.default />}/>}
          {<react_router_dom_1.Route path='/onboarding/:id' element={<Onboarding_1.default />}/>}
          {<react_router_dom_1.Route path='/login' element={<Login_1.default />}/>}
          {<react_router_dom_1.Route path='/register' element={<Register_1.default />}/>}
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </div>);
};
exports.default = App;
