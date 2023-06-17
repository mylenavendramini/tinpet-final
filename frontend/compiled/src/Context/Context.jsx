"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyProvider = exports.Context = void 0;
const react_1 = require("react");
exports.Context = (0, react_1.createContext)(undefined);
const MyProvider = ({ children }) => {
    const [user, setUser] = (0, react_1.useState)(null);
    const [dogs, setDogs] = (0, react_1.useState)(null);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const [isSignUp, setIsSignUp] = (0, react_1.useState)(true);
    const updateUser = (newUser) => {
        setUser(newUser);
    };
    const updateDog = (newDog) => {
        setDogs(newDog);
    };
    const updateModal = () => {
        setShowModal(!showModal);
    };
    const updateSignUp = () => {
        setIsSignUp(!isSignUp);
    };
    return (<exports.Context.Provider value={{
            user,
            updateUser,
            dogs,
            updateDog,
            showModal,
            updateModal,
            isSignUp,
            updateSignUp,
        }}>
      {children}
    </exports.Context.Provider>);
};
exports.MyProvider = MyProvider;
