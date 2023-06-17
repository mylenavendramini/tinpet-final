"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APIServices_1 = require("../services/APIServices");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
//TODO:
function AuthModal() {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    function handleRegister(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            //message to say password must match
        }
        else {
            try {
                (0, APIServices_1.register)(email, password).then((res) => {
                    if (res.username) {
                        navigate('/dashboard');
                    }
                    else {
                        //flash a message saying failed
                    }
                });
            }
            catch (e) {
                console.log('OMEGA LUL your function failed');
            }
        }
    }
}
exports.default = AuthModal;
