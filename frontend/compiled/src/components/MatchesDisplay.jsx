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
const ChatDisplay_1 = __importDefault(require("./ChatDisplay"));
const ArrowCircleLeft_1 = __importDefault(require("@mui/icons-material/ArrowCircleLeft"));
const MatchesDisplay = () => {
    var _a, _b;
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const currentDog = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog;
    const currentDogId = Number(currentDog === null || currentDog === void 0 ? void 0 : currentDog.id);
    const getDogMatchesIds = () => __awaiter(void 0, void 0, void 0, function* () {
        apiService
            .getMatches(currentDogId)
            .then((data) => {
            setMatchedIds(data);
        })
            .catch((error) => console.log(error));
    });
    console.log(contexts === null || contexts === void 0 ? void 0 : contexts.matchedDogs, currentDog);
    // const getDogMatches = () => {
    //   apiService.getDogs().then((data) => {
    //     const matchedDogs: Dog[] = [];
    //     console.log({ matchedIds });
    //     matchedIds.forEach((matchId) => {
    //       data.filter((dog) => {
    //         if (dog.id === matchId) matchedDogs.push(dog);
    //       });
    //     });
    //     setMatchedProfiles(matchedDogs);
    //     setGotMatches(true)
    //   });
    // };
    (0, react_1.useEffect)(() => {
        getDogMatchesIds();
        // getDogMatches();
    }, []);
    return (<div className='matches-display'>
      {(_a = contexts === null || contexts === void 0 ? void 0 : contexts.matchedDogs) === null || _a === void 0 ? void 0 : _a.map((matchProfile, idx) => {
            return (<div key={idx} className='match-card' onClick={() => contexts === null || contexts === void 0 ? void 0 : contexts.updateSelectedDog(matchProfile)}>
            <div className='img-container'>
              <img src={matchProfile === null || matchProfile === void 0 ? void 0 : matchProfile.url} alt='matched photo'/>
            </div>
            <h3>{matchProfile === null || matchProfile === void 0 ? void 0 : matchProfile.name}</h3>
          </div>);
        })}
=======
  // const matchedProfiles = contexts?.matchedDogs;
  const [matchedProfiles, setMatchedProfiles] = useState<Types_1.Dog />[]>([]);
  const [openChat, setOpenChat] = useState(false);
  console.log(openChat);

  useEffect(() => {}
    const showMatches = contexts?.dogs?.filter((dog) => {}
      return dog.matches_dogs.includes(contexts?.currentDog?.id as number);
    }) as Dog[];
    setMatchedProfiles(showMatches);
    console.log({showMatches});
  }, []);

  return (
    <div className='matches-display'>
      {openChat ? (<div className='option'>
          <div className='chat-header'>
            <span onClick={() => setOpenChat(false)}>
              <ArrowCircleLeft_1.default />
            </span>
            <h2> {(_b = contexts === null || contexts === void 0 ? void 0 : contexts.selectedDog) === null || _b === void 0 ? void 0 : _b.name}</h2>
          </div>
          <ChatDisplay_1.default />
        </div>) : (<>
          <h2 className=''>Matches</h2>
          {matchedProfiles === null || matchedProfiles === void 0 ? void 0 : matchedProfiles.map((matchProfile, idx) => (<div key={idx} className='match-card' onClick={() => contexts === null || contexts === void 0 ? void 0 : contexts.updateSelectedDog(matchProfile)}>
              <div className='img-container' onClick={() => setOpenChat(!openChat)}>
                <img src={matchProfile === null || matchProfile === void 0 ? void 0 : matchProfile.url} alt='matched photo'/>
              </div>
              <h3>{matchProfile === null || matchProfile === void 0 ? void 0 : matchProfile.name}</h3>
            </div>))}
        </>)}
>>>>>>> frontend-mylena
    </div>
  );
};
export default MatchesDisplay;
    </>);
};
