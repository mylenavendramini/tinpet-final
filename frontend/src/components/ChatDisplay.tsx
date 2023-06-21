import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import apiService from '../services/APIServices';
import { Message } from '../types/Types';

const ChatDisplay = () => {
  const [message, setMessage] = useState('');
  const [showMessages, setShowMessages] = useState<Message[]>([]);
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
    apiService.sendMessage(sender_id, newMessage).then((message) => {
      setShowMessages([...showMessages, message]);
    });
    setMessage('');
  };

  const getMessages = async () => {
    apiService.getMessages().then((messagesArray) => {
      const showMessages = messagesArray.filter((message) => {
        return (
          message.sender_id === (contexts?.currentDog?.id as number) ||
          message.receiver_id === (contexts?.currentDog?.id as number)
        );
      });
      setShowMessages(showMessages);
    });
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <div className='chat-display'>
        {showMessages.map((message: Message, idx: number) => {
          if (message.sender_id === contexts?.currentDog?.id) {
            return (
              <div className='chat-message-header left' key={idx}>
                <p>{message.content}</p>
              </div>
            );
          } else if (message.sender_id !== contexts?.currentDog?.id) {
            return (
              <div className='chat-message-header right'>
                <p>{message.content}</p>
              </div>
            );
          }
        })}
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
