import { useContext, useState } from 'react';
import { Context } from '../Context/Context';
import apiService from '../services/APIServices';

const ChatDisplay = () => {
  const [message, setMessage] = useState('');
  const contexts = useContext(Context);

  const addMessage = async () => {
    const id = contexts?.currentDog?.id as number;
    const newMessage = {
      content: message,
      sender: id,
      receiver: contexts?.selectedDog?.id as number,
    };
    console.log(contexts?.selectedDog, contexts?.currentDog);
    apiService.sendMessage(id, newMessage).then((res) => {
      contexts?.updateMessages([...contexts.messages, res]);
      console.log(contexts?.messages);
    });
  };
  return (
    <>
      <div className='chat-display'>
        {contexts?.messages.map((message) => (
          <div key={message.id}>
            <div className='chat-message-header'>
              <div className='img-container'>
                <img
                  src={contexts?.selectedDog?.url}
                  alt={message.receiver + ' profile'}
                />{' '}
                {/*contexts?.selectedDog?.url} is subject to change */}
              </div>
              <p>{message.receiver}</p>
            </div>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <div className='chat-input'>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className='btn-secondary' onClick={addMessage}>
          Submit
        </button>
      </div>
    </>
  );
};

export default ChatDisplay;
