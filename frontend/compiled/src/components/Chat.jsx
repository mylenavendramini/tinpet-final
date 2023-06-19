"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Context_1 = require("../Context/Context");
const Chat = () => {
    const contexts = (0, react_1.useContext)(Context_1.Context);
    return (<>
      <div className='chat-display'>
        {contexts === null || contexts === void 0 ? void 0 : contexts.messages.map((message) => {
            var _a;
            return (<div key={message.id}>
            <div className='chat-message-header'>
              <div className='img-container'>
                <img src={(_a = contexts === null || contexts === void 0 ? void 0 : contexts.selectedDog) === null || _a === void 0 ? void 0 : _a.url} alt={message.receiver + ' profile'}/> {/*contexts?.selectedDog?.url} is subject to change */}
              </div>
              <p>{message.receiver}</p>
            </div>
            <p>{message.content}</p>
          </div>);
        })}
      </div>
    </>);
};
exports.default = Chat;
