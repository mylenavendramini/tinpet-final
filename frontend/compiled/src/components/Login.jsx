"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Close_1 = __importDefault(require("@mui/icons-material/Close"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const APIServices_1 = __importDefault(require("../services/APIServices"));
const Context_1 = require("../Context/Context");
const Login = () => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)('');
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const navigate = (0, react_router_dom_1.useNavigate)();
    function login(e) {
        e.preventDefault();
        if (!password || !email) {
            setError('Missing credentials!');
        }
        else {
            try {
                APIServices_1.default.login(email, password).then((user) => {
                    if (user.username) {
                        contexts === null || contexts === void 0 ? void 0 : contexts.updateAuthenticated(true);
                        contexts === null || contexts === void 0 ? void 0 : contexts.updateUser(user);
                        localStorage.setItem('user', JSON.stringify(user));
                        navigate('/');
                    }
                    else {
                        setError('Unable to login');
                    }
                });
            }
            catch (e) {
                setError('OMEGA LUL your login function failed');
            }
        }
    }
    return (<div className='overlay'>
      <div className='auth-modal'>
        <div onClick={() => navigate('/')}>
          <Close_1.default className='close-icon'/>
        </div>
        <h2>Login</h2>
        <form onSubmit={(e) => login(e)}>
          <input type='email' id='email' name='email' placeholder='email' required={true} onChange={(e) => setEmail(e.target.value)}/>
          <input type='password' id='password' name='password' placeholder='password' required={true} onChange={(e) => setPassword(e.target.value)}/>
          {error}
          <input type='submit' className='btn-secondary'/>
        </form>
      </div>
    </div>);
};
exports.default = Login;
