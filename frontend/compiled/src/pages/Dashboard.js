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
const axios_1 = __importDefault(require("axios"));
const react_cookie_1 = require("react-cookie");
const Dashboard = () => {
    const [user, setUser] = (0, react_1.useState)({});
    const [users, setUsers] = (0, react_1.useState)([]);
    const [cookies, setCookie, removeCookie] = (0, react_cookie_1.useCookies)(['user']);
    const [lastDirection, setLastDirection] = (0, react_1.useState)();
    const userId = cookies.UserId;
    const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get('http://localhost:3000/user', {
                params: { userId },
            });
            setUser(response.data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get('http://localhost:3000/users', {
                params: { userId },
            });
            setUsers(response.data);
        }
        catch (error) {
            console.log(error);
        }
    });
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
            yield axios_1.default.put('http://localhost:3000/addmatch', {
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
    const filteredUsers = users.filter(user => user.user_id !== userId);
    return (<>
      {user && (<div className='dashboard'>
          <ChatContainer_1.default user={user}/>
          <div className='swiper-container'>
            <div className='card-container'>
              {filteredUsers.map((user) => (<div className='swipe' key={user.user_id} onSwipe={(dir) => swiped(dir, user.user_id)} onCardLeftScreen={() => outOfFrame(user.name)}>
                  <div style={{ backgroundImage: 'url(' + user.url + ')' }} className='card'>
                    <h3>
                      {user.name + ', Age: '}
                      {user.age}
                    </h3>
                  </div>
                </div>))}
              <div className='swipe-info'>
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>)}
    </>);
};
exports.default = Dashboard;
