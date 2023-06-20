"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Close_1 = __importDefault(require("@mui/icons-material/Close"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const apiservices_1 = __importDefault(require("../services/apiservices"));
const Context_1 = require("../Context/Context");
const AuthModal = () => {
    var _a;
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)('');
    const [username, setUsername] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)('');
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const userId = Number((_a = contexts === null || contexts === void 0 ? void 0 : contexts.user) === null || _a === void 0 ? void 0 : _a.id);
    const handleClick = () => {
        contexts === null || contexts === void 0 ? void 0 : contexts.updateModal();
    };
    function handleRegister(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords needs to match!');
        }
        else {
            try {
                apiservices_1.default.register(username, email, password).then((res) => {
                    if (res.username) {
                        localStorage.setItem('user', JSON.stringify(res));
                        contexts === null || contexts === void 0 ? void 0 : contexts.updateAuthenticated(true);
                        contexts === null || contexts === void 0 ? void 0 : contexts.updateUser(res);
                        navigate(`/onboarding/${res.id}`);
                    }
                    else {
                        setError('Unable to login');
                    }
                });
            }
            catch (e) {
                console.log('OMEGA LUL your authentication failed');
            }
        }
    }
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   try {
    //     if (isSignUp && password !== confirmPassword) {
    //       setError('Passwords needs to match!');
    //       return;
    //     }
    //     const response = await axios.post(
    //       `http://localhost:3000/${isSignUp ? 'signup' : 'login'}`,
    //       {
    //         email,
    //         password,
    //       }
    //     );
    //     setCookies('AuthToken', response.data.token);
    //     setCookies('UserId', response.data.userId);
    //     const success = response.status === 201;
    // if (success && isSignUp) navigate('/onboarding');
    // if (success && !isSignUp) navigate('/dashboard');
    //     window.location.reload();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    return (<div className='overlay'>
      <div className='auth-modal'>
        <div onClick={() => navigate('/')}>
          <Close_1.default className='close-icon'/>
        </div>
        <h2>{(contexts === null || contexts === void 0 ? void 0 : contexts.isSignUp) ? 'CREATE AN ACCOUNT' : 'LOG IN'}</h2>
        <form onSubmit={(e) => handleRegister(e)}>
          <input type='text' id='username' name='username' placeholder='username' required={true} onChange={(e) => setUsername(e.target.value)}/>
          <input type='email' id='email' name='email' placeholder='email' required={true} onChange={(e) => setEmail(e.target.value)}/>
          <input type='password' id='password' name='password' placeholder='password' required={true} onChange={(e) => setPassword(e.target.value)}/>
          {(contexts === null || contexts === void 0 ? void 0 : contexts.isSignUp) && (<input type='password' id='password-check' name='password-check' placeholder='confirm your password' required={true} onChange={(e) => setConfirmPassword(e.target.value)}/>)}
          <input type='submit' className='btn-secondary'/>
          <p>{error}</p>
        </form>
        <hr />
        <h2>GET THE APP</h2>
      </div>
    </div>);
};
exports.default = AuthModal;
