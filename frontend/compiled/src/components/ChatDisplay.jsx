"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chat_1 = __importDefault(require("./Chat"));
const ChatInput_1 = __importDefault(require("./ChatInput"));
const react_1 = require("react");
const Context_1 = require("../Context/Context");
//TODO:
const ChatDisplay = () => {
    const contexts = (0, react_1.useContext)(Context_1.Context);
    return (<>
      {/*<Chat descendingOrderMessages={descendingOrderMessages} />*/}
      <Chat_1.default />
      <ChatInput_1.default />
    </>);
};
exports.default = ChatDisplay;
// const userId = user?.user_id;
// const clickedUserId = clickedUSer?.user_id;
// const [usersMessages, setUsersMessages] = useState(null);
// const [clickedUsersMessages, setClickedUsersMessages] = useState(null);
// const getUsersMessages = async () => {
//   try {
//     const response = await axios.get('http://localhost:3000/messages', {
//       params: { userId: userId, correspondingUserId: clickedUserId },
//     });
//     setUsersMessages(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// const getClickedUsersMessages = async () => {
//   try {
//     const response = await axios.get('http://localhost:3000/messages', {
//       params: { userId: clickedUserId, correspondingUserId: userId },
//     });
//     setClickedUsersMessages(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// useEffect(() => {
//   getUsersMessages();
//   getClickedUsersMessages();
// }, []);
// const messages = [];
// usersMessages?.forEach((message) => {
//   const formattedMessage = {};
//   formattedMessage['name'] = user?.name;
//   formattedMessage['img'] = user?.url;
//   formattedMessage['message'] = message.message;
//   formattedMessage['timestamp'] = message.timestamp;
//   messages.push(formattedMessage);
// });
// clickedUsersMessages?.forEach((message) => {
//   const formattedMessage = {};
//   formattedMessage['name'] = clickedUSer?.name;
//   formattedMessage['img'] = clickedUSer?.url;
//   formattedMessage['message'] = message.message;
//   formattedMessage['timestamp'] = message.timestamp;
//   messages.push(formattedMessage);
// });
// const descendingOrderMessages = messages?.sort((a, b) =>
//   a.timestamp.localeCompare(b.timestamp)
// );
