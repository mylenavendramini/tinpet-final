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
const react_1 = require("react");
const Context_1 = require("../Context/Context");
const react_router_1 = require("react-router");
const APIServices_1 = __importDefault(require("../services/APIServices"));
const Nav_1 = __importDefault(require("./Nav"));
const MyDogs = () => {
    var _a;
    const [gotDogs, setGotDogs] = (0, react_1.useState)(false);
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const myDogs = contexts === null || contexts === void 0 ? void 0 : contexts.myDogs;
    const userId = (_a = contexts === null || contexts === void 0 ? void 0 : contexts.user) === null || _a === void 0 ? void 0 : _a.id;
    const navigate = (0, react_router_1.useNavigate)();
    console.log({ myDogs });
    const handleClickDog = (dog) => {
        contexts === null || contexts === void 0 ? void 0 : contexts.updateCurrentDog(dog);
        navigate('/dashboard');
    };
    const getAllTheDogs = () => __awaiter(void 0, void 0, void 0, function* () {
        APIServices_1.default.getDogsofUSer(userId).then((data) => {
            contexts === null || contexts === void 0 ? void 0 : contexts.updateMyDogs(data);
            if (data.length > 0) {
                contexts === null || contexts === void 0 ? void 0 : contexts.updateCurrentDog(data[0]);
            }
            setGotDogs(true);
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
    return (<>
      <div className='overlay'>
        <Nav_1.default />
        <h2 id='my-dogs-title'>My dogs</h2>
        <div className='my-dogs-container'>
          {gotDogs &&
            (myDogs === null || myDogs === void 0 ? void 0 : myDogs.map((dog) => (<div className='my-dog'>
                <p onClick={() => handleClickDog(dog)}>{dog.name}</p>
                <img src={`${dog.url}`} alt={dog.name} onClick={() => handleClickDog(dog)}/>
              </div>)))}
        </div>
      </div>
    </>);
};
exports.default = MyDogs;
