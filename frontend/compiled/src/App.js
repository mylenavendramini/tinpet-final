"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const Home_1 = __importDefault(require("./pages/Home"));
const Dashboard_1 = __importDefault(require("./pages/Dashboard"));
const Onboarding_1 = __importDefault(require("./pages/Onboarding"));
const react_router_dom_1 = require("react-router-dom");
const react_cookie_1 = require("react-cookie");
//TODO:
const App = () => {
    const [cookies, setCookie, removeCookie] = (0, react_cookie_1.useCookies)(['user']);
    const authToken = cookies.AuthToken;
    return (<>
      <react_router_dom_1.BrowserRouter>
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path='/' element={<Home_1.default />}/>
          {authToken && <react_router_dom_1.Route path='/dashboard' element={<Dashboard_1.default />}/>}
          {authToken && <react_router_dom_1.Route path='/onboarding' element={<Onboarding_1.default />}/>}
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </>);
};
exports.default = App;
