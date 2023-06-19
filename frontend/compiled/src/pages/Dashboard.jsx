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
const react_router_1 = require("react-router");
const react_tinder_card_1 = __importDefault(require("react-tinder-card"));
const Dashboard = () => {
    const [currentUser, setCurrentUser] = (0, react_1.useState)({
        email: '',
        password: '',
        id: 0,
    });
    const { id } = (0, react_router_1.useParams)();
    const parsedId = Number(id);
    function getUser() {
        APIServices_1.default.getUser(parsedId).then((data) => {
            setCurrentUser(data);
        });
    }
    (0, react_1.useEffect)(() => {
        getUser();
    }, []);
    (0, react_1.useEffect)(() => {
        if (user) {
            getAllUsers();
        }
    }, [user]);
    const updateMatches = (matchedUserId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios.put('http://localhost:3000/addmatch', {
                userId,
                matchedUserId,
            });
            getUser();
        }
        catch (error) {
            console.log(error);
        }
    });
    const swiped = (direction, swipedId) => {
        if (direction === 'right') {
            updateMatches(swipedId);
        }
        setLastDirection(direction);
    };
    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
    };
    const filteredUsers = users.filter((user) => user.id !== userId);
    return (<>
      {currentUser && (<div className='dashboard'>
          <ChatContainer_1.default user={currentUser}/>
          <div className='swiper-container'>
            {<div className='card-container'>
                {filteredUsers.map((user) => (<react_tinder_card_1.default className='swipe' key={user.user_id} onSwipe={(dir) => swiped(dir, user.user_id)} onCardLeftScreen={() => outOfFrame(user.name)}>
                    <div style={{ backgroundImage: 'url(' + user.url + ')' }} className='card'>
                      <h3>
                        {user.name + ', Age: '}
                        {user.age}
                      </h3>
                    </div>
                  </react_tinder_card_1.default>))}
                <div className='swipe-info'>
                  {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                </div>
              </div>}
          </div>
        </div>)}
    </>);
};
exports.default = Dashboard;
