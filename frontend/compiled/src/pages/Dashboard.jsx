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
const APIServices_1 = __importDefault(require("../services/APIServices"));
const react_tinder_card_1 = __importDefault(require("react-tinder-card"));
const Context_1 = require("../Context/Context");
const DogProfile_1 = __importDefault(require("../components/DogProfile"));
const Favorite_1 = __importDefault(require("@mui/icons-material/Favorite"));
const HeartBroken_1 = __importDefault(require("@mui/icons-material/HeartBroken"));
const material_1 = require("@mui/material");
const Dashboard = () => {
    const [lastDirection, setLastDirection] = (0, react_1.useState)('');
    const [otherDogs, setOtherDogs] = (0, react_1.useState)([]);
    const [likedMessage, setLikedMessage] = (0, react_1.useState)(false);
    const [notLikedMessage, setNotLikedMessage] = (0, react_1.useState)(false);
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const currentUser = contexts === null || contexts === void 0 ? void 0 : contexts.user;
    const currentDog = contexts === null || contexts === void 0 ? void 0 : contexts.currentDog;
    const [open, setOpen] = (0, react_1.useState)(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const updateMatches = (otherDogId) => __awaiter(void 0, void 0, void 0, function* () {
        APIServices_1.default.addMatch(currentDog, otherDogId).then((theOtherDog) => {
            if (theOtherDog.matches_dogs.includes(currentDog.id)) {
                alert('Its a maaaatch');
            }
        });
    });
    const swiped = (direction, otherDogId) => {
        setLastDirection(direction);
        const dogsLeft = otherDogs.filter((leftDog) => {
            return leftDog.id !== otherDogId;
        });
        if (direction == 'right') {
            setOpen(true);
            setNotLikedMessage(false);
            setLikedMessage(true);
            setOtherDogs(dogsLeft);
            updateMatches(otherDogId);
        }
        else if (direction == 'left') {
            setOpen(true);
            setLikedMessage(false);
            setNotLikedMessage(true);
            setOtherDogs(dogsLeft);
        }
    };
    const outOfFrame = (dog) => {
        console.log(dog.name + ' left the screen!');
    };
    (0, react_1.useEffect)(() => {
        var _a;
        const dog = localStorage.getItem('currentDog');
        const addDogs = (_a = contexts === null || contexts === void 0 ? void 0 : contexts.dogs) === null || _a === void 0 ? void 0 : _a.filter((dog) => {
            return ((dog === null || dog === void 0 ? void 0 : dog.userId) !== (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) &&
                !currentDog.matches_dogs.includes(dog === null || dog === void 0 ? void 0 : dog.id) &&
                !currentDog.liked_dog.includes(dog === null || dog === void 0 ? void 0 : dog.id));
        });
        setOtherDogs(addDogs);
        if (dog) {
            const parsedDog = JSON.parse(dog);
            console.log(parsedDog);
            contexts === null || contexts === void 0 ? void 0 : contexts.updateCurrentDog(parsedDog);
        }
        else {
            console.log('You need to login first');
        }
    }, [lastDirection]);
    return (<>
      <div className='dashboard'>
        <DogProfile_1.default />
        <div className='swiper-container'>
          <div className='card-container'>
            {otherDogs === null || otherDogs === void 0 ? void 0 : otherDogs.map((dog, idx) => (<div className='card-wrapper' key={idx}>
                <react_tinder_card_1.default className='swipe' onSwipe={(direction) => swiped(direction, dog.id)} onCardLeftScreen={() => outOfFrame(dog)}>
                  <div style={{ backgroundImage: 'url(' + dog.url + ')' }} 
        // className={removed ? 'removed' : 'card'}
        className='card'>
                    <h3>{`${dog.name}, Age: ${dog.age}`}</h3>
                  </div>
                </react_tinder_card_1.default>
              </div>))}
            <div className='message'>
              {likedMessage && (<material_1.Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <material_1.Alert onClose={handleClose} icon={false} color='error' severity='warning' sx={{ width: '100%' }}>
                    <Favorite_1.default />
                    <span>You liked this dog</span>
                  </material_1.Alert>
                </material_1.Snackbar>)}
              {notLikedMessage && (<material_1.Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
                  <material_1.Alert onClose={handleClose} severity='warning' icon={false} color='error' sx={{ width: '100%' }}>
                    <HeartBroken_1.default />
                    <span>You didn't like this dog</span>
                  </material_1.Alert>
                </material_1.Snackbar>)}
            </div>
          </div>
        </div>
      </div>
    </>);
};
exports.default = Dashboard;
