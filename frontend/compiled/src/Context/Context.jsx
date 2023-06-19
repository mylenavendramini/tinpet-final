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
    const [matchedDogs, setMatchedDogs] = (0, react_1.useState)([]);
    const [myDogs, setMyDogs] = (0, react_1.useState)([]);
    const [currentDog, setCurrentDog] = (0, react_1.useState)(null);
    const [authenticated, setAuthenticated] = (0, react_1.useState)(false);
    const [selectedDog, setSelectedDog] = (0, react_1.useState)(null);
    const [messages, setMessages] = (0, react_1.useState)([]);
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
    const updateMyDogs = (myDogs) => {
        setMyDogs(myDogs);
    };
    const updateMatches = (matchedDogs) => {
        setMatchedDogs(matchedDogs);
    };
    const updateCurrentDog = (dog) => {
        setCurrentDog(dog);
    };
    const updateAuthenticated = (auth) => {
        setAuthenticated(auth);
    };
    const updateSelectedDog = (dog) => {
        setSelectedDog(dog);
    };
    const updateMessages = (messages) => {
        setMessages(messages);
    };
    return (<exports.Context.Provider value={{
            user,
            updateUser,
            dogs,
            updateDog,
            myDogs,
            updateMyDogs,
            showModal,
            updateModal,
            isSignUp,
            updateSignUp,
            matchedDogs,
            updateMatches,
            currentDog,
            updateCurrentDog,
            authenticated,
            updateAuthenticated,
            selectedDog,
            updateSelectedDog,
            messages,
            updateMessages
        }}>
      {children}
    </exports.Context.Provider>);
};
exports.MyProvider = MyProvider;
