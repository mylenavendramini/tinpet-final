import { useState,useContext } from 'react';
import apiService from '../services/APIServices';
import { Context } from '../Context/Context';

const ChatInput = () => {
  // user={user} i think must be changed to current dog
  // clickedUser={clickedUSer} must be changed to clicked/selected dog to message
  // getUserMessages={getUsersMessages}
  // getClickedUsersMessages={getClickedUsersMessages}
  const [message, setMessage] = useState('');
  const contexts = useContext(Context);
  // const userId = user?.user_id;
  // const clickedUserId = clickedUser?.user_id;

  const addMessage = async () => {
    const id = contexts?.currentDog?.id as number
    // const sender = contexts?.currentDog?.name as string
    const newMessage = {
      content: message,
      sender: id,
      receiver: contexts?.selectedDog?.name as string,
    };
    apiService.sendMessage(id, newMessage).then((res) => {
      contexts?.updateMessages([...contexts.messages, res])
    })
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
