"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Home_1 = __importDefault(require("./pages/Home"));
const Dashboard_1 = __importDefault(require("./pages/Dashboard"));
const Onboarding_1 = __importDefault(require("./pages/Onboarding"));
const react_router_dom_1 = require("react-router-dom");
const react_cookie_1 = require("react-cookie");
const Login_1 = __importDefault(require("./components/Login"));
const react_1 = require("react");
const Context_1 = require("./Context/Context");
const apiservices_1 = __importDefault(require("./services/apiservices"));
const AuthModal_1 = __importDefault(require("./components/AuthModal"));
const App = () => {
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const [cookies, setCookie, removeCookie] = (0, react_cookie_1.useCookies)(['user']);
    (0, react_1.useEffect)(() => {
        const user = localStorage.getItem('user');
        // console.log(JSON.parse(user).username)
        if (user) {
            const { email, password } = JSON.parse(user);
            contexts === null || contexts === void 0 ? void 0 : contexts.updateAuthenticated(true);
            apiservices_1.default.login(email, password).then((res) => {
                contexts === null || contexts === void 0 ? void 0 : contexts.updateUser(res);
            });
        }
        else {
            console.log('no users');
        }
    }, []);
    // useEffect(() => {
    //   const user = localStorage.getItem('user')
    //   const parsedUser =  JSON.parse(user)
    //   console.log(parsedUser.username, parsedUser.password)
    //   if (parsedUser.username) {
    //     contexts?.updateUser(parsedUser)
    //     contexts?.updateAuthenticated(true)
    //   }
    // }, [])
    // const authToken = cookies.AuthToken;
    return (<>
      <react_router_dom_1.BrowserRouter>
        <react_router_dom_1.Routes>
          {<react_router_dom_1.Route path='/' element={<Home_1.default />}/>}
          {<react_router_dom_1.Route path='/dashboard' element={<Dashboard_1.default />}/>}
          {<react_router_dom_1.Route path='/onboarding/:id' element={<Onboarding_1.default />}/>}
          {<react_router_dom_1.Route path='/login' element={<Login_1.default />}/>}
          {<react_router_dom_1.Route path='/register' element={<AuthModal_1.default />}/>}
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </>);
};
exports.default = App;
