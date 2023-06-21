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
    console.log(newMessage);
    apiService.sendMessage(sender_id, newMessage).then((message) => {
      setShowMessages([...showMessages, message]);
    });
  };

  console.log(contexts?.messages);

  const getMessages = async () => {
    apiService
      .getMessages(contexts?.currentDog?.id as number)
      .then((messagesArray) => setShowMessages(messagesArray));
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const showMessages = contexts?.messages?.filter((message) => {
      return (
        message.sender_id === (contexts?.currentDog?.id as number) ||
        message.receiver_id === (contexts?.currentDog?.id as number)
      );
    }) as [];
    setShowMessages(showMessages);
    console.log({ showMessages });
  }, []);

  return (
    <>
      <div className='chat-display'>
        {showMessages.map((message: Message) => (
          <div key={message.id}>
            <div className='chat-message-header'>
              <div className='img-container'>
                <img
                  src={contexts?.selectedDog?.url}
                  alt={message.receiver_name + ' profile'}
                />{' '}
                {/*contexts?.selectedDog?.url} is subject to change */}
              </div>
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
