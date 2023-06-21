import { useContext, useState } from 'react';
import { Context } from '../Context/Context';
import apiService from '../services/APIServices';

const ChatDisplay = () => {
  const [message, setMessage] = useState('');
  const contexts = useContext(Context);

  const addMessage = async () => {
    const sender_id = contexts?.currentDog?.id as number;
    const sender_name = contexts?.currentDog?.name as string;
    const receiver_id = contexts?.selectedDog?.id as number;
    const receiver_name = contexts?.selectedDog?.name as string;

    const newMessage = {
      content: message,
      sender_id,
      sender_name,
      receiver_id,
      receiver_name,
    };
    console.log(newMessage);
    apiService.sendMessage(sender_id, newMessage).then((message) => {
      contexts?.updateMessages([...contexts.messages, message]);
    });
  };

  console.log(contexts?.messages);

  // const getMessages = async () => {
  //   apiService.getMessages();
  // };

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
