"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const APIServices_1 = __importDefault(require("../services/APIServices"));
const Context_1 = require("../Context/Context");
function MatchedDogs() {
    const [myDog, setMyDog] = (0, react_1.useState)();
    const contexts = (0, react_1.useContext)(Context_1.Context);
    (0, react_1.useEffect)(() => {
        APIServices_1.default.getDogs().then((res) => {
            // setMyDogs(res.filter((el: Dog) => {el}));
            contexts === null || contexts === void 0 ? void 0 : contexts.updateMatches(res.filter((el) => {
                return el.matches_dogs.includes(myDog.id);
            }));
        });
    }, []);
    return (<>
    {contexts === null || contexts === void 0 ? void 0 : contexts.matchedDogs.map((el) => {
            return <div key={el.id}>
          <span className='dog-name' key={el.id}>{el.name}</span>
          <img src={`${el.url}`}></img>
        </div>;
        })}
    </>);
}
exports.default = MatchedDogs;
