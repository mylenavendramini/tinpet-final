"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Context_1 = require("../Context/Context");
const MatchesDisplay = () => {
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const matchedProfiles = contexts === null || contexts === void 0 ? void 0 : contexts.matchedDogs;
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
