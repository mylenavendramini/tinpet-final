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
const react_2 = require("react");
const Context_1 = require("../Context/Context");
const APIServices_1 = __importDefault(require("../services/APIServices"));
const MatchesDisplay = () => {
    const [matchedIds, setMatchedIds] = (0, react_1.useState)([]);
    const [matchedProfiles, setMatchedProfiles] = (0, react_1.useState)([]);
    const [gotMatches, setGotMatches] = (0, react_1.useState)(false);
    const contexts = (0, react_2.useContext)(Context_1.Context);
    const currentDog = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog;
    const currentDogId = Number(currentDog === null || currentDog === void 0 ? void 0 : currentDog.id);
    const getDogMatchesIds = () => __awaiter(void 0, void 0, void 0, function* () {
        APIServices_1.default
            .getMatches(currentDogId)
            .then((data) => {
            setMatchedIds(data);
        })
            .catch((error) => console.log(error));
    });
    const getDogMatches = () => {
        APIServices_1.default.getDogs().then((data) => {
            const matchedDogs = [];
            console.log({ matchedIds });
            matchedIds.forEach((matchId) => {
                data.filter((dog) => {
                    if (dog.id === matchId)
                        matchedDogs.push(dog);
                });
            });
            setMatchedProfiles(matchedDogs);
            setGotMatches(true);
        });
    };
    (0, react_1.useEffect)(() => {
        getDogMatchesIds();
        getDogMatches();
    }, []);
    return (<div className='matches-display'>
      {matchedProfiles === null || matchedProfiles === void 0 ? void 0 : matchedProfiles.map((matchProfile, idx) => (<div key={idx} className='match-card' onClick={() => contexts === null || contexts === void 0 ? void 0 : contexts.updateSelectedDog(matchProfile)}>
          <div className='img-container'>
            <img src={matchProfile === null || matchProfile === void 0 ? void 0 : matchProfile.url} alt='matched photo'/>
          </div>
          <h3>{matchProfile === null || matchProfile === void 0 ? void 0 : matchProfile.name}</h3>
        </div>))}
    </div>);
};
exports.default = MatchesDisplay;
