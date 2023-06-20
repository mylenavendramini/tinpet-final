import { useState, useContext } from 'react';
import apiService from '../services/APIServices';
import { Context } from '../Context/Context';

const ChatInput = () => {

  const [message, setMessage] = useState('');
  const contexts = useContext(Context);

  const addMessage = async () => {
    const id = contexts?.currentDog?.id as number;
    const newMessage = {
      content: message,
      sender: id,
      receiver: contexts?.selectedDog?.id as number,
    };
    console.log(contexts?.selectedDog, contexts?.currentDog)
    apiService.sendMessage(id, newMessage).then((res) => {
      contexts?.updateMessages([...contexts.messages, res]);
      console.log(contexts?.messages)
    });
  };

  return (
    <div className='chat-input'>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button className='btn-secondary' onClick={addMessage}>
        Submit
      </button>
    </div>
  );
};

export default ChatInput;
