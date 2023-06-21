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
const AuthModal_1 = __importDefault(require("./components/AuthModal"));
const Mydogs_1 = __importDefault(require("./components/Mydogs"));
const App = () => {
    var _a;
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const [gotDogs, setGotDogs] = (0, react_1.useState)(false);
    const userId = (_a = contexts === null || contexts === void 0 ? void 0 : contexts.user) === null || _a === void 0 ? void 0 : _a.id;
    const getAllTheDogs = () => __awaiter(void 0, void 0, void 0, function* () {
        APIServices_1.default.getDogsofUSer(userId).then((data) => {
            contexts === null || contexts === void 0 ? void 0 : contexts.updateMyDogs(data);
            if (data.length > 0) {
                contexts === null || contexts === void 0 ? void 0 : contexts.updateCurrentDog(data[0]);
            }
            // setGotDogs(true);
        });
    });
    const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        APIServices_1.default.login(email, password).then((res) => {
            contexts === null || contexts === void 0 ? void 0 : contexts.updateUser(res);
        });
    });
    (0, react_1.useEffect)(() => {
        if (contexts === null || contexts === void 0 ? void 0 : contexts.authenticated) {
            getAllTheDogs();
        }
        else {
            console.log('no users');
        }
    }, []);
    (0, react_1.useEffect)(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const { email, password } = JSON.parse(user);
            login(email, password);
            contexts === null || contexts === void 0 ? void 0 : contexts.updateAuthenticated(true);
        }
        else {
            console.log('no users');
        }
    }, []);
    (0, react_1.useEffect)(() => {
        APIServices_1.default.getDogs().then((data) => {
            contexts === null || contexts === void 0 ? void 0 : contexts.updateDogs(data);
            setGotDogs(true);
        });
    }, []);
    console.log(contexts === null || contexts === void 0 ? void 0 : contexts.myDogs, 'here');
    return (<>
      <react_router_dom_1.BrowserRouter>
        <react_router_dom_1.Routes>
          {<react_router_dom_1.Route path='/' element={<Home_1.default />}/>}
          {<react_router_dom_1.Route path='/myDogs' element={<Mydogs_1.default />}/>}
          {<react_router_dom_1.Route path='/dashboard' element={<Dashboard_1.default />}/>}
          {<react_router_dom_1.Route path='/onboarding/:id' element={<Onboarding_1.default />}/>}
          {<react_router_dom_1.Route path='/login' element={<Login_1.default />}/>}
          {<react_router_dom_1.Route path='/register' element={<AuthModal_1.default />}/>}
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </>);
};
exports.default = App;
