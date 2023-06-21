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
const ChatContainer_1 = __importDefault(require("../components/ChatContainer"));
const APIServices_1 = __importDefault(require("../services/APIServices"));
const react_tinder_card_1 = __importDefault(require("react-tinder-card"));
const Context_1 = require("../Context/Context");
const Dashboard = () => {
    var _a;
    const [lastDirection, setLastDirection] = (0, react_1.useState)('');
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const currentUser = contexts === null || contexts === void 0 ? void 0 : contexts.user;
    const currentDog = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog;
    const updateMatches = (otherDogId) => __awaiter(void 0, void 0, void 0, function* () {
        APIServices_1.default.addMatch(currentDog, otherDogId).then((theOtherDog) => {
            if (theOtherDog.matches_dogs.includes(currentDog.id)) {
                // alert('Its a maaaatch');
            }
        });
    });
    const swiped = (direction, otherDogId) => {
        console.log(direction);
        if (direction == 'right') {
            updateMatches(otherDogId);
        }
        setLastDirection(direction);
    };
    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
    };
    const otherDogs = (_a = contexts === null || contexts === void 0 ? void 0 : contexts.dogs) === null || _a === void 0 ? void 0 : _a.filter((dog) => {
        return (dog === null || dog === void 0 ? void 0 : dog.userId) !== (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id);
    });
    return (<>
      {currentUser && (<div className='dashboard'>
          <ChatContainer_1.default />
          <div className='swiper-container'>
            {<div className='card-container'>
                {otherDogs === null || otherDogs === void 0 ? void 0 : otherDogs.map((dog, idx) => (<>
                    <react_tinder_card_1.default className='swipe' key={idx} onSwipe={(direction) => swiped(direction, dog.id)} onCardLeftScreen={() => outOfFrame(dog.name)}>
                      <div style={{ backgroundImage: 'url(' + dog.url + ')' }} className='card' onClick={() => swiped('right', dog.id)}>
                        <h3>
                          {dog.name + ', Age: '}
                          {dog.age}
                        </h3>
                      </div>
                    </react_tinder_card_1.default>
                  </>))}
                <div className='swipe-info'>
                  {lastDirection && <p>You swiped {lastDirection}</p>}
                </div>
              </div>}
          </div>
        </div>)}
    </>);
};
exports.default = Dashboard;
