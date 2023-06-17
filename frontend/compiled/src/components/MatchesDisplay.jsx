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
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
//TODO:
const MatchesDisplay = ({ matches, setClickedUser }) => {
    const [matchedProfiles, setMatchedProfiles] = (0, react_1.useState)(null);
    console.log(matches);
    const getMatches = () => __awaiter(void 0, void 0, void 0, function* () {
        const matchedUserIds = matches.map(({ user_id }) => user_id);
        try {
            const response = yield axios_1.default.get('http://localhost:3000/matchedusers', {
                params: { userIds: JSON.stringify(matchedUserIds) },
            });
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
