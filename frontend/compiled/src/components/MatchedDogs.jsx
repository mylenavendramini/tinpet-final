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
            contexts === null || contexts === void 0 ? void 0 : contexts.updateMatches(res.filter((el) => {
                if (el.matches_dogs.includes(myDog === null || myDog === void 0 ? void 0 : myDog.id)) {
                    return el;
                }
            }));
        });
    }, []);
    return (<>
      {contexts === null || contexts === void 0 ? void 0 : contexts.matchedDogs.map((dog) => {
            return (<div key={dog.id}>
            <span className='dog-name' key={dog.id}>
              {dog.name}
            </span>
            <img src={`${dog.url}`}></img>
          </div>);
        })}
    </>);
}
exports.default = MatchedDogs;
