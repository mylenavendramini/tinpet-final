import { useState, useEffect, useContext } from 'react';
import apiService from '../services/APIServices';
import { Context } from '../Context/Context';


const Chat = () => {
  const contexts = useContext(Context);
  
  return (
    <>
      <div className='chat-display'>
        {contexts?.messages.map((message) => (
          <div key={message.id}>
            <div className='chat-message-header'>
              <div className='img-container'>
                <img src={contexts?.selectedDog?.url} alt={message.receiver + ' profile'} /> {/*contexts?.selectedDog?.url} is subject to change */}
              </div>
              <p>{message.receiver}</p>
            </div>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Chat;
