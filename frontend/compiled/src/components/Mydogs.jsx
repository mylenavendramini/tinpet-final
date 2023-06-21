"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Context_1 = require("../Context/Context");
const react_router_1 = require("react-router");
const Nav_1 = __importDefault(require("./Nav"));
const MyDogs = () => {
    var _a;
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const myDogs = contexts === null || contexts === void 0 ? void 0 : contexts.myDogs;
    const userId = (_a = contexts === null || contexts === void 0 ? void 0 : contexts.user) === null || _a === void 0 ? void 0 : _a.id;
    const navigate = (0, react_router_1.useNavigate)();
    console.log({ myDogs });
    const handleClickDog = (dog) => {
        contexts === null || contexts === void 0 ? void 0 : contexts.updateCurrentDog(dog);
        navigate(`/dashboard/${dog.id}`);
    };
    console.log({ myDogs });
    return (<>
      <div className='overlay'>
        <Nav_1.default />
        <h2 id='my-dogs-title'>My dogs</h2>
        <div className='my-dogs-container'>
          {myDogs === null || myDogs === void 0 ? void 0 : myDogs.map((dog, idx) => (<div className='my-dog' key={idx}>
              <p onClick={() => handleClickDog(dog)}>{dog.name}</p>
              <img src={`${dog.url}`} alt={dog.name} onClick={() => handleClickDog(dog)}/>
            </div>))}
        </div>
      </div>
    </>);
};
exports.default = MyDogs;
