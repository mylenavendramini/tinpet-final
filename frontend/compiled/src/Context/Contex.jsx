"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyProvider = exports.Context = void 0;
const react_1 = require("react");
exports.Context = (0, react_1.createContext)(undefined);
const MyProvider = ({ children }) => {
    const [user, setUser] = (0, react_1.useState)(null);
    const [dogs, setDogs] = (0, react_1.useState)(null);
    const updateUser = (newUser) => {
        setUser(newUser);
    };
    const updateDog = (newDog) => {
        setDogs(newDog);
    };
    return (<exports.Context.Provider value={{ user, updateUser, dogs, updateDog }}>
      {children}
    </exports.Context.Provider>);
};
exports.MyProvider = MyProvider;
