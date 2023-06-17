"use strict";
/* eslint-disable react/prop-types */
Object.defineProperty(exports, "__esModule", { value: true });
//TODO:
const Chat = ({ descendingOrderMessages }) => {
    return (<>
      <div className='chat-display'>
        {descendingOrderMessages.map((message, _index) => (<div key={_index}>
            <div className='chat-message-header'>
              <div className='img-container'>
                <img src={message.img} alt={message.name + ' profile'}/>
              </div>
              <p>{message.name}</p>
            </div>
            <p>{message.message}</p>
          </div>))}
      </div>
    </>);
};
exports.default = Chat;
