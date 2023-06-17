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
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const react_2 = require("react");
const Context_1 = require("../Context/Context");
const MatchesDisplay = ({ matches, setClickedUser, }) => {
    const context = (0, react_2.useContext)(Context_1.Context);
    const dogs = context === null || context === void 0 ? void 0 : context.dogs;
    const updateDog = context === null || context === void 0 ? void 0 : context.updateDog;
    const dogName = dogs === null || dogs === void 0 ? void 0 : dogs.map((dog) => dog.name);
    const dogUrl = dogs === null || dogs === void 0 ? void 0 : dogs.map((dog) => dog.url);
    console.log(matches);
    const getMatches = () => __awaiter(void 0, void 0, void 0, function* () {
        const matchedUserIds = matches.map(({ user_id }) => user_id);
        try {
            const response = yield axios_1.default.get('http://localhost:3000/matchedusers', {
                params: { userIds: JSON.stringify(matchedUserIds) },
            });
            //TODO:
            setMatchedProfiles(response.data);
        }
        catch (error) {
            console.log(error);
        }
    });
    (0, react_1.useEffect)(() => {
        getMatches();
    }, [matches]);
    return (<div className='matches-display'>
      {matchedProfiles === null || matchedProfiles === void 0 ? void 0 : matchedProfiles.map((match) => (<div key={match.user_id} className='match-card' onClick={() => setClickedUser(match)}>
          <div className='img-container'>
            <img src={match === null || match === void 0 ? void 0 : match.url} alt='matched photo'/>
          </div>
          <h3>{match === null || match === void 0 ? void 0 : match.name}</h3>
        </div>))}
    </div>);
};
exports.default = MatchesDisplay;
