import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import apiService from '../services/APIServices';
import { Dog, Message } from '../types/Types';

const ChatDisplay = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const contexts = useContext(Context);

  const addMessage = async () => {
    const receiver_id = contexts?.selectedDog?.id as number;
    const receiver_name = contexts?.selectedDog?.name as string;
    const newMessage = {
      content: message,
      receiver_id,
      receiver_name,
    } as Message;
    const dog = localStorage.getItem('currentDog');
    if (dog) {
      const parsedDog = JSON.parse(dog) as Dog;
      const parsedId = parsedDog.id as number;

      apiService.sendMessage(parsedId, newMessage).then((message) => {
        setMessages([...messages, message]);
      });
    }
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addMessage();
    }
  };

  const getMessages = async () => {
    const dog = localStorage.getItem('currentDog');
    if (dog) {
      const parsedDog = JSON.parse(dog);
      contexts?.updateCurrentDog(parsedDog);

      const receiveMessages = contexts?.selectedDog?.messages?.filter(
        (message) => {
          return message.receiver_id === contexts.currentDog?.id;
        }
      ) as Message[];

      const sentMessages = contexts?.currentDog?.messages?.filter((message) => {
        return message.receiver_id === contexts.selectedDog?.id;
      }) as Message[];
      setMessages(
        [...receiveMessages, ...sentMessages].sort(
          (a: Message, b: Message) => Number(a?.id) - Number(b?.id)
        )
      );
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <div className='chat-display'>
        {messages &&
          messages.map((message: Message, idx: number) => {
            if (message.receiver_id !== contexts?.currentDog?.id) {
              return (
                <div className='chat-message-header right' key={idx}>
                  <p>{message.content}</p>
                </div>
              );
            } else {
              return (
                <div className='chat-message-header left'>
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
          onKeyDown={(e) => handleKeyPress(e)}
        ></textarea>
        <button className='btn-secondary' onClick={addMessage}>
          Submit
        </button>
      </div>
    </>
  );
};

export default ChatDisplay;
